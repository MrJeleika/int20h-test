import { UseAppKitAccountReturn } from '@reown/appkit';
import { ChevronLeft } from 'lucide-react';
import { ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { Separator } from '../ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '../ui/sidebar';

import { routes } from '@/router';

type NavElement = {
  id: string;
  icon: ReactNode;
  title: string;
};

type ProjectNavbarProps = {
  elements: NavElement[];
  children: ReactNode;
  projectName: string;
  activeElementId: string;
  accountInfo: UseAppKitAccountReturn;
  openProfile: () => void;
  setActivePage: (id: string) => void;
};

const ProjectNavbar = ({
  elements,
  children,
  projectName,
  activeElementId,
  accountInfo,
  setActivePage,
  openProfile,
}: ProjectNavbarProps) => {
  const navigate = useNavigate();

  const handleClickBack = useCallback(() => navigate(routes.root), [navigate]);

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="mb-1">
              <SidebarMenuButton
                className="m-1 flex h-8 w-8 items-center justify-center"
                onClick={handleClickBack}
              >
                <ChevronLeft />
              </SidebarMenuButton>
              <Separator orientation="vertical" className="mr-2 h-4" />
              {projectName}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {elements.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.id === activeElementId}
                      onClick={() => setActivePage(item.id)}
                      className="cursor-pointer"
                    >
                      <a>
                        {item.icon}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            onClick={openProfile}
          >
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="rounded-lg">P</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {accountInfo.embeddedWalletInfo?.user?.username ??
                  'Your profile'}
              </span>
              <span className="truncate text-xs">
                {accountInfo.embeddedWalletInfo?.user?.email ??
                  accountInfo.address}
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink>{projectName}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {elements.find((x) => x.id === activeElementId)?.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ProjectNavbar;
