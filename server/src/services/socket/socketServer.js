import { Server } from "socket.io";
import User from "../../models/User.js";
import Team from "../../models/Team.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();
let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.APP_BASE_URL || "http://localhost:5173",
            credentials: true,
        },
    });

    //Middleware to authenticate socket connections
    io.use(async(socket, next) => {
        try {
            const token = socket.handshake.auth.token;
            if(!token) {
                return next(new Error('Authentication error'))
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.userId = decoded.id;
            next();
        } catch (error) {
            next(new Error('Authentication Error'));
        }
    });

    io.on('connection', async(socket) => {
        const userId = socket.userId;

        try {
            //Mark user as online
            await User.findByIdAndUpdate(userId, {
                isOnline: true,
                socketId: socket.id
            });

            const user = await User.findById(userId);
            const teams = await Team.find({ "members.user": userId });

            if(teams && teams.length > 0) {
                teams.forEach(team => {
                    socket.join(`team:${team._id}`);
                });
            }

            //Broadcast online status to user's teams
            if(teams && teams.length > 0) {
                teams.forEach(team => {
                    io.to(`team:${team._id}`).emit('user:online', {
                        userId,
                        name: user.name,
                        profileImage: user.profileImage,
                    });
                });
            }

            // Handle manual team joins
            socket.on('join:team', (teamId) => {
                if (!socket.rooms.has(`team:${teamId}`)) {  // only join if not already in
                    socket.join(`team:${teamId}`);
                }
            });

            // Handle leaving team rooms (ONLY ONE, not two!)
            socket.on('leave:team', (teamId) => {
                socket.leave(`team:${teamId}`);
            });

            socket.on('disconnect', async() => {

                try {
                    //Mark user as offline
                    const user = await User.findByIdAndUpdate(
                        userId,
                        {
                            isOnline: false,
                            socketId: null,
                        },
                        { new: true }
                    );

                    //Get user's teams
                    const teams = await Team.find({ "members.user": userId });

                    //Broadcast offline status to user's teams
                    if(teams && teams.length > 0) {
                        teams.forEach(team => {
                            io.to(`team:${team._id}`).emit('user:offline', { userId });
                        });
                    }
                } catch (error) {
                    console.log('Error handling disconnect', error);
                }
            });
            
        } catch (error) {
            console.log('Error in socket connection', error);
        }
    });

    return io;
};

//Emit task events to specific teams
export const emitToTeam = (teamId, event, data) => {
    if(io) {
        io.to(`team:${teamId}`).emit(event, data);
    }
};

//Emit to specific user
export const emitToUser = async(userId, event, data) => {
    try {
        const user = await User.findById(userId);
        if(user && user.socketId) {
            io.to(user.socketId).emit(event, data);
        }
    } catch (error) {
        console.log('Error emitting to user', error);
    }
}