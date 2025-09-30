import { useTheme } from "../../context/ThemeProvider";

export function Personalization() {
  const { theme, setTheme } = useTheme();

    return<section className=" space-y-3 sm:w-100 lg:w-120">
  {/* Appearance */}
  <div className="bg-bg rounded-xl shadow-sm p-5">
    <h2 className="text-sm font-semibold text-text-primary mb-4">Appearance</h2>
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">Theme</span>
        <select 
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="border rounded-md text-text-primary bg-surface px-2 py-1 text-sm">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
    </div>
  </div>

  {/* Task Preferences */}
  <div className="bg-bg rounded-xl shadow-sm p-5">
    <h2 className="text-sm font-semibold text-text-primary mb-4">Task Preferences</h2>
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">Default View</span>
        <select className="border text-text-primary bg-surface rounded-md px-2 py-1 text-sm">
          <option>List</option>
          <option>Card</option>
          <option>Table</option>
        </select>
      </div>
    </div>
  </div>

  {/* Notifications */}
  <div className="bg-bg rounded-xl shadow-sm p-5">
    <h2 className="text-sm font-semibold text-text-primary mb-4">Notifications</h2>
    <div className="space-y-3">
      <label className="flex items-center justify-between text-sm text-text-secondary">
        In-App Notifications
        <input type="checkbox" className="w-4 h-4 accent-blue-600" />
      </label>
    </div>
  </div>

  {/* Language & Region */}
  <div className="bg-bg rounded-xl shadow-sm p-5">
    <h2 className="text-sm font-semibold text-text-primary mb-4">Language & Region</h2>
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">Language</span>
        <select className="border rounded-md px-2 py-1 text-sm text-text-primary bg-surface">
          <option>English</option>
          <option>Spanish</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">Date Format</span>
        <select className="border bg-surface text-text-primary rounded-md px-2 py-1 text-sm">
          <option>MM/DD/YYYY</option>
          <option>DD/MM/YYYY</option>
        </select>
      </div>
    </div>
  </div>

  {/* Reset */}
  <div className="flex justify-end">
    <button className="text-xs px-3 py-1 rounded-md border border-gray-300 text-text-secondary hover:bg-bg">
      Restore Defaults
    </button>
  </div>
</section>

}

export default Personalization