export function Billing() {
    return<section className="bg-bg rounded-2xl p-6 shadow-md sm:w-100 lg:w-120">
      {/* Header */}
      <h1 className="text-lg font-semibold text-text-primary mb-6">
        Billing & Payments
      </h1>

      {/* Payment Method */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-text-primary mb-2">Payment Method</h2>
        <div className="flex justify-between items-center border border-border p-3 rounded-lg">
          <p className="text-sm text-text-secondary">Visa •••• 4242 (exp 12/26)</p>
          <button className="text-text-secondary text-sm hover:underline">
            Update
          </button>
        </div>
      </div>

      {/* Billing Info */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-text-primary mb-2">Billing Info</h2>
        <div className="space-y-1 text-sm text-text-primary">
          <p>Company: Acme Corp</p>
          <p>Tax ID: PH-1234567</p>
          <p>Address: 123 Main St, Manila, PH</p>
        </div>
        <button className="mt-2 text-text-secondary cursor-pointer text-sm hover:underline">
          Edit
        </button>
      </div>

      {/* Invoices */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-text-primary mb-2">Invoices</h2>
        <div className="divide-y text-text-secondary divide-border text-sm">
          <div className="flex justify-between py-2">
            <span>Sep 25, 2025 — $29.00</span>
            <button className="text-text-secondary hover:underline text-xs">
              Download
            </button>
          </div>
          <div className="flex justify-between py-2">
            <span>Aug 25, 2025 — $29.00</span>
            <button className="text-text-secondary hover:underline text-xs">
              Download
            </button>
          </div>
          <div className="flex justify-between py-2">
            <span>Jul 25, 2025 — $29.00</span>
            <button className="text-text-secondary hover:underline text-xs">
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Next Payment */}
      <div className="p-3 border border-border rounded-lg bg-bg text-sm text-text-secondary">
        Next Payment: <span className="font-medium">$29.00</span> on Oct 25, 2025
      </div>
    </section>
}

export default Billing