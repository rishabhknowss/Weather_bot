import { ApiKeyCard } from "./ApiKeyCard"
import { UserTableCard } from "./UserTableCard"

export default function Dashboard({ apiKey, users, onUpdateApiKey, onDeleteUser }) {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Dashboard Header */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Dashboard
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">Manage your API keys and user access</p>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
          {/* API Key Section - Takes up 1/3 of the space on large screens */}
          <div className="col-span-1">
            <ApiKeyCard apiKey={apiKey} onUpdateApiKey={onUpdateApiKey} />
          </div>

          {/* Users Section - Takes up 2/3 of the space on large screens */}
          <div className="lg:col-span-2 col-span-1">
            <UserTableCard users={users} onDeleteUser={onDeleteUser} />
          </div>
        </div>
      </div>
    </div>
  )
}

