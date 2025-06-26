import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarContext = React.createContext({});

const SidebarProvider = ({ children }) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  const [openMobile, setOpenMobile] = React.useState(false);
  const [state, setState] = React.useState("expanded");

  const toggleSidebar = () => {
    setState((prev) => (prev === "expanded" ? "collapsed" : "expanded"));
  };

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

const sidebarVariants = cva(
  "flex flex-col bg-background h-full border-r",
  {
    variants: {
      state: {
        expanded: `w-[${SIDEBAR_WIDTH}]`,
        collapsed: `w-[${SIDEBAR_WIDTH_ICON}]`,
      },
    },
    defaultVariants: {
      state: "expanded",
    },
  }
);

const Sidebar = ({ className, children, ...props }) => {
  const { isMobile, state, open, setOpen, openMobile, setOpenMobile } = useSidebar();

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side="left" className="w-[18rem] p-0">
          <div className="flex flex-col h-full">
            {children}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(sidebarVariants({ state }), className)}
      {...props}
    >
      {children}
    </aside>
  );
};

const SidebarTrigger = ({ className, ...props }) => {
  const { toggleSidebar, isMobile, setOpenMobile } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8", className)}
      onClick={() => (isMobile ? setOpenMobile(true) : toggleSidebar())}
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

const SidebarContent = ({ className, children, ...props }) => (
  <div className={cn("flex flex-1 flex-col", className)} {...props}>
    {children}
  </div>
);

const SidebarHeader = ({ className, children, ...props }) => (
  <div className={cn("flex flex-col p-4", className)} {...props}>
    {children}
  </div>
);

const SidebarFooter = ({ className, children, ...props }) => (
  <div className={cn("flex flex-col p-4", className)} {...props}>
    {children}
  </div>
);

const SidebarMenu = ({ className, children, ...props }) => (
  <nav className={cn("flex flex-col gap-2", className)} {...props}>
    {children}
  </nav>
);

const SidebarMenuItem = ({ className, children, ...props }) => (
  <div className={cn("flex items-center", className)} {...props}>
    {children}
  </div>
);

const SidebarMenuButton = React.forwardRef(
  ({ className, asChild, children, tooltip, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { state } = useSidebar();

    const button = (
      <Comp
        ref={ref}
        className={cn(
          "flex h-8 w-full items-center gap-2 rounded-md px-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
          state === "collapsed" && "justify-center",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );

    if (tooltip && state === "collapsed") {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>{button}</TooltipTrigger>
            <TooltipContent side="right">{tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return button;
  }
);

const SidebarInput = React.forwardRef(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    className={cn("h-8", className)}
    {...props}
  />
));

const SidebarLabel = ({ className, children, ...props }) => (
  <label
    className={cn("px-3 text-xs font-medium text-muted-foreground", className)}
    {...props}
  >
    {children}
  </label>
);

const SidebarSeparator = ({ className, ...props }) => (
  <Separator className={cn("my-2", className)} {...props} />
);

const SidebarSkeleton = ({ className, ...props }) => (
  <Skeleton className={cn("h-8 w-full", className)} {...props} />
);

export {
  Sidebar,
  SidebarProvider,
  useSidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInput,
  SidebarLabel,
  SidebarSeparator,
  SidebarSkeleton,
};