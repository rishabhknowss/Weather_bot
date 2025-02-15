import { ApiKeyCard } from "./ApiKeyCard";
import { UserTableCard } from "./UserTableCard";

export default function Dashboard({
  apiKey,
  users,
  onUpdateApiKey,
  onDeleteUser,
}) {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Dashboard
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            Manage your API keys and user access
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
          <div className="col-span-1">
            <ApiKeyCard apiKey={apiKey} onUpdateApiKey={onUpdateApiKey} />
          </div>

          <div className="lg:col-span-2 col-span-1">
            <UserTableCard users={users} onDeleteUser={onDeleteUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
