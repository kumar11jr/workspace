"use client";
import { cn } from "@/lib/utils";
import {
  ChevronsLeft,
  MenuIcon,
  Plus,
  PlusCircle,
  Search,
  Settings,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import UserItem from "./user-Item";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Item } from "./item";
import { toast } from "sonner";
import { DocumentList } from "./documentlist";
import { Navbar } from "./navbar";

export const Navigation = () => {
  const create = useMutation(api.document.create);
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams()
  const isMobile = useMediaQuery("(max-width:768px");
  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResset, setisResset] = useState(false);
  const [isCollapsed, setisCollapsed] = useState(isMobile);

  const onCreate = () => {
    const promise = create({ title: "Untitled" })
    .then((documentId)=>{
      router.push(`/dash/${documentId}`);
    });
  
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New Note created",
      error: "Failed to create a new note.",
    });
  };

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = e.clientX;
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100%-${newWidth}px)`);
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setisCollapsed(false);
      setisResset(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100%-240px"
      );

      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");

      setTimeout(() => setisResset(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setisCollapsed(true);
      setisResset(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setisResset(false), 300);
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overfow-y-auto relative flex w-60 flex-col z-[99999]",
          isResset && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div
          role="button"
          onClick={collapse}
          className={cn(
            "h-5 w-5 rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition ",
            isMobile && "opacity-100"
          )}
        >
          <ChevronsLeft className="h-5 w-5" />
        </div>
        <div>
          <UserItem />
          <Item onClick={onCreate} icon={PlusCircle} label="New Note" />
          <Item onClick={() => {}} icon={Settings} label="Settings" />
          <Item onClick={() => {}} icon={Search} label="Search" isSearch />
        </div>
        <div className="mt-5">
          <DocumentList />
          <Item onClick={onCreate} icon={Plus} label="New Note"  />
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResset && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        {!!params.documentId ? (
          <Navbar isCollapsed={isCollapsed} onresetwidth={resetWidth} />
        ):(
          <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon onClick={resetWidth} role="button" className="h-5 w-5" />
          )}
        </nav>
        )}
        
      </div>
    </>
  );
};
