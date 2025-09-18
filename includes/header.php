<header class="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
    <div class="flex items-center justify-between px-6 py-4">
        <div class="flex items-center">
            <button id="sidebar-toggle" class="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden">
                <i class="fas fa-bars text-xl"></i>
            </button>
            
            <div class="ml-4 lg:ml-0">
                <h1 class="text-2xl font-bold text-gray-900"><?php echo APP_NAME; ?></h1>
                <p class="text-sm text-gray-600">Digital Approval Workflow</p>
            </div>
        </div>

        <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <div class="relative">
                <button id="notifications-btn" class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 relative">
                    <i class="fas fa-bell text-xl"></i>
                    <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        3
                    </span>
                </button>
                
                <div id="notifications-dropdown" class="hidden absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div class="p-4 border-b border-gray-200">
                        <div class="flex items-center justify-between">
                            <h3 class="text-lg font-semibold text-gray-900">Notifications</h3>
                            <button class="text-sm text-blue-600 hover:text-blue-800">Mark all read</button>
                        </div>
                    </div>
                    <div class="max-h-96 overflow-y-auto">
                        <div class="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                            <div class="flex items-start space-x-3">
                                <div class="flex-shrink-0">
                                    <i class="fas fa-check-circle text-green-500"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <p class="text-sm font-medium text-gray-900">Requisition Approved</p>
                                    <p class="text-sm text-gray-600 mt-1">REQ-2025-001 has been approved</p>
                                    <p class="text-xs text-gray-400 mt-2">2 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- User Menu -->
            <div class="relative">
                <button id="user-menu-btn" class="flex items-center space-x-3 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <i class="fas fa-user text-white"></i>
                    </div>
                    <div class="hidden md:block text-left">
                        <p class="text-sm font-medium text-gray-900"><?php echo htmlspecialchars($_SESSION['full_name']); ?></p>
                        <p class="text-xs text-gray-500"><?php echo htmlspecialchars($_SESSION['department'] ?? 'No Department'); ?></p>
                    </div>
                </button>

                <div id="user-menu-dropdown" class="hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <a href="profile.php" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-user-cog mr-3"></i>
                        Profile Settings
                    </a>
                    <a href="logout.php" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <i class="fas fa-sign-out-alt mr-3"></i>
                        Sign out
                    </a>
                </div>
            </div>
        </div>
    </div>
</header>

<script>
// Toggle dropdowns
document.getElementById('notifications-btn').addEventListener('click', function(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('notifications-dropdown');
    dropdown.classList.toggle('hidden');
    document.getElementById('user-menu-dropdown').classList.add('hidden');
});

document.getElementById('user-menu-btn').addEventListener('click', function(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('user-menu-dropdown');
    dropdown.classList.toggle('hidden');
    document.getElementById('notifications-dropdown').classList.add('hidden');
});

// Close dropdowns when clicking outside
document.addEventListener('click', function() {
    document.getElementById('notifications-dropdown').classList.add('hidden');
    document.getElementById('user-menu-dropdown').classList.add('hidden');
});
</script>