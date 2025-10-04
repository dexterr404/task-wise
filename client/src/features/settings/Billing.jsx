export function Billing({ billingData }) {
  const subscription = billingData?.subscription;
  const invoices = billingData?.invoices || []; // <-- from backend

  return (
    <section className="bg-bg min-h-full rounded-2xl p-6 shadow-md sm:w-100 lg:w-120">
      {/* Header */}
      <h1 className="text-lg font-semibold text-text-primary mb-6">
        Billing & Payments
      </h1>

      {/* Next Payment */}
      <div className="p-3 border border-border rounded-lg bg-bg text-sm text-text-secondary mb-6">
        Next Payment:{" "}
        {billingData?.subscription?.plan === "pro" && billingData?.subscription?.status === "active" ? (
          <>
            <span className="font-medium">
              {subscription?.price} {subscription?.currency || "USD"}
            </span>{" "}
            on{" "}
            {subscription?.nextBillingDate
              ? new Date(subscription.nextBillingDate).toLocaleDateString()
              : "N/A"}
          </>
        ) : (
          "N/A"
        )}
      </div>

      {/* Invoices List */}
      <div className="mt-4">
        <h2 className="text-md font-semibold text-text-primary mb-3">
          Invoices
        </h2>
        {invoices.length > 0 ? (
          <div className="max-h-64 overflow-y-auto scrollbar-auto-hide border border-border rounded-lg">
            <ul className="divide-y divide-border">
              {/* Header row (sticky on desktop) */}
              <li className="hidden sm:flex justify-between items-center font-medium text-text-primary bg-bg sticky top-0 p-3 z-10">
                <span className="w-1/3">Amount</span>
                <span className="w-1/3 text-center">Date</span>
                <span className="w-1/3 text-right">Payment ID</span>
              </li>

              {invoices.map((invoice, idx) => (
                <li
                  key={idx}
                  className="p-3 text-sm text-text-secondary flex flex-col sm:flex-row sm:items-center sm:justify-between"
                >
                  {/* Mobile stacked view */}
                  <div className="flex flex-col sm:flex-row sm:w-1/3">
                    <span className="font-medium sm:hidden">Amount: </span>
                    <span>
                      {invoice.amount} {invoice.currency}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:w-1/3 sm:justify-center">
                    <span className="font-medium sm:hidden">Date: </span>
                    <span>
                      {new Date(invoice.paidAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:w-1/3 sm:justify-end">
                    <span className="font-medium sm:hidden">Payment ID: </span>
                    <span className="text-xs break-all">
                      {invoice.paypalPaymentId}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-text-secondary flex justify-center">No invoices yet.</p>
        )}
      </div>
    </section>
  );
}

export default Billing;
