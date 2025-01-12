import {
  Sidebar as SCSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Box, FileText, Home, LogOut, Shield, Shirt, Tag, Truck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/contexts/UserContext";

export function Sidebar() {
  const { logout, user } = useUserContext();
  const router = useNavigate();
  const { isMobile } = useSidebar();
  const nav = [
    {
      icon: Home,
      title: "Home",
      url: "/app/home",
    },
    {
      icon: FileText,
      title: "Zamówienia",
      url: "/app/orders",
    },
    {
      icon: Box,
      title: "Produkty",
      url: "/app/products",
    },
    {
      icon: Shirt,
      title: "Rozmiary",
      url: "/app/sizes",
    },
    {
      icon: Truck,
      title: "Metody dostawy",
      url: "/app/delivery-methods",
    },
    {
      icon: Tag,
      title: "Kody promocyjne",
      url: "/app/codes",
    },
    {
      icon: Shield,
      title: "Administratorzy",
      url: "/app/admins",
    },
  ];
  return (
    <SCSidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton size="lg" className="py-2">
          <img src="/images/logo-max.png" alt="logo" className="h-9 w-9" />
          <div className="grid flex-1 text-left leading-tight">
            <h1 className="truncate text-lg font-semibold">BlueElephant</h1>
            <p className="truncate text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarMenu>
            {nav.map((item) => (
              <SidebarMenuButton
                key={item.title}
                tooltip={item.title}
                onClick={() => {
                  if (item.url) router(item.url);
                }}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback>{user?.email[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="truncate">{user?.email}</span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="font-normal flex flex-row items-center gap-2">
              <Avatar className="w-9 h-9">
                <AvatarFallback>{user?.email[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="truncate">{user?.email}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logout();
                router("/");
              }}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </SCSidebar>
  );
}
