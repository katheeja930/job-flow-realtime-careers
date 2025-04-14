
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { 
  BellIcon, 
  MenuIcon, 
  UserCircleIcon, 
  LogOutIcon,
  BriefcaseIcon,
  SearchIcon,
  HomeIcon,
  AlertCircleIcon,
  BarChartIcon,
  SettingsIcon,
  SunIcon,
  MoonIcon
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "@/components/ui/use-toast";
import { mockNotifications } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/context/ThemeContext";

const Header = () => {
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const handleSignOut = async () => {
    await signOut();
  };

  const unreadNotificationsCount = mockNotifications.filter(
    (n) => !n.is_read
  ).length;

  // Role-based navigation items
  const getNavItems = () => {
    if (!user) return [];

    const commonItems = [
      { name: "Home", path: "/", icon: <HomeIcon className="h-5 w-5" /> },
    ];

    if (user.role === "job_seeker") {
      return [
        ...commonItems,
        { 
          name: "Jobs", 
          path: "/jobs", 
          icon: <BriefcaseIcon className="h-5 w-5" /> 
        },
        { 
          name: "Applications", 
          path: "/applications", 
          icon: <SearchIcon className="h-5 w-5" /> 
        },
        { 
          name: "Profile", 
          path: "/profile", 
          icon: <UserCircleIcon className="h-5 w-5" /> 
        },
      ];
    } else if (user.role === "employer") {
      return [
        ...commonItems,
        { 
          name: "My Listings", 
          path: "/employer/listings", 
          icon: <BriefcaseIcon className="h-5 w-5" /> 
        },
        { 
          name: "Applications", 
          path: "/employer/applications", 
          icon: <SearchIcon className="h-5 w-5" /> 
        },
        { 
          name: "Company Profile", 
          path: "/employer/profile", 
          icon: <UserCircleIcon className="h-5 w-5" /> 
        },
      ];
    } else if (user.role === "admin") {
      return [
        ...commonItems,
        { 
          name: "Analytics", 
          path: "/admin/analytics", 
          icon: <BarChartIcon className="h-5 w-5" /> 
        },
        { 
          name: "Users", 
          path: "/admin/users", 
          icon: <UserCircleIcon className="h-5 w-5" /> 
        },
        { 
          name: "Reports", 
          path: "/admin/reports", 
          icon: <AlertCircleIcon className="h-5 w-5" /> 
        },
      ];
    }
    
    return commonItems;
  };

  const navItems = getNavItems();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="border-b sticky top-0 z-50 bg-background">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <BriefcaseIcon className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-xl">Jobverse</span>
          </Link>
        </div>

        {user && (
          <nav className="hidden md:flex space-x-6 mx-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium transition-colors hover:text-primary flex items-center"
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
          
          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <BellIcon className="h-5 w-5" />
                    {unreadNotificationsCount > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                      >
                        {unreadNotificationsCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {mockNotifications.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground text-sm">
                      No notifications
                    </div>
                  ) : (
                    <>
                      {mockNotifications.map((notification) => (
                        <DropdownMenuItem key={notification.id} asChild>
                          <Link 
                            to={notification.link || "#"} 
                            className={`flex flex-col p-2 cursor-pointer ${!notification.is_read ? 'bg-muted/50' : ''}`}
                            onClick={() => {
                              // Mark as read
                              toast({
                                title: "Notification viewed",
                                description: "Notification marked as read",
                              });
                            }}
                          >
                            <div className="font-medium text-sm">{notification.title}</div>
                            <div className="text-xs text-muted-foreground">{notification.message}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {new Date(notification.created_at).toLocaleString()}
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/40" alt={user.email} />
                      <AvatarFallback>
                        {user.email.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <UserCircleIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <MenuIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center py-2 px-3 hover:bg-accent rounded-md"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                      </Link>
                    ))}
                    <div className="pt-4 border-t">
                      <Button
                        variant="ghost"
                        className="flex items-center justify-start w-full py-2 px-3 hover:bg-accent rounded-md"
                        onClick={handleSignOut}
                      >
                        <LogOutIcon className="mr-3 h-5 w-5" />
                        Log out
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <Link to="/auth">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
