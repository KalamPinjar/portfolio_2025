"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { toast } from "sonner";
import {
  ArrowUpRight,
  Copy,
  FileText,
  FolderOpen,
  Home,
  Mail,
  User,
} from "lucide-react";

import { site } from "@/lib/site";
import { projects } from "@/lib/projects";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    function onOpenRequest() {
      setOpen(true);
    }

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("open-command-palette", onOpenRequest);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("open-command-palette", onOpenRequest);
    };
  }, []);

  function run(action: () => void) {
    setOpen(false);
    action();
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      className="fixed inset-0 z-[80]"
      overlayClassName="fixed inset-0 z-[80] bg-night/70 backdrop-blur-sm"
      contentClassName="fixed left-1/2 top-[18%] z-[90] w-[min(560px,calc(100vw-2rem))] -translate-x-1/2"
    >
      <div className="glass overflow-hidden rounded-card shadow-2xl">
        <Command loop>
          <div className="flex items-center gap-3 border-b border-line px-4">
            <span className="label text-accent">⌘K</span>
            <Command.Input
              placeholder="Jump to a project, page or link…"
              className="h-14 flex-1 bg-transparent text-sm text-fg outline-none placeholder:text-fg-3"
            />
          </div>

          <Command.List className="max-h-[min(400px,50vh)] overflow-y-auto p-2">
            <Command.Empty className="px-3 py-8 text-center text-sm text-fg-3">
              Nothing matches that.
            </Command.Empty>

            <Group heading="Case studies">
              {projects
                .filter((project) => project.study)
                .map((project) => (
                  <Item
                    key={project.slug}
                    onSelect={() => run(() => router.push(`/work/${project.slug}`))}
                  >
                    <FolderOpen className="size-4 text-accent" aria-hidden="true" />
                    <span>{project.name}</span>
                    <span className="ml-auto text-xs text-fg-3">
                      {project.category}
                    </span>
                  </Item>
                ))}
            </Group>

            <Group heading="Pages">
              <Item onSelect={() => run(() => router.push("/"))}>
                <Home className="size-4 text-fg-3" aria-hidden="true" />
                Home
              </Item>
              <Item onSelect={() => run(() => router.push("/work"))}>
                <FolderOpen className="size-4 text-fg-3" aria-hidden="true" />
                All work
              </Item>
              <Item onSelect={() => run(() => router.push("/about"))}>
                <User className="size-4 text-fg-3" aria-hidden="true" />
                About
              </Item>
              <Item onSelect={() => run(() => router.push("/contact"))}>
                <Mail className="size-4 text-fg-3" aria-hidden="true" />
                Contact
              </Item>
            </Group>

            <Group heading="Actions">
              <Item
                onSelect={() =>
                  run(async () => {
                    try {
                      await navigator.clipboard.writeText(site.email);
                      toast.success("Email copied", { description: site.email });
                    } catch {
                      toast.error("Could not copy", {
                        description: `Use ${site.email}`,
                      });
                    }
                  })
                }
              >
                <Copy className="size-4 text-fg-3" aria-hidden="true" />
                Copy email address
              </Item>
              <Item onSelect={() => run(() => window.open(site.resume, "_blank"))}>
                <FileText className="size-4 text-fg-3" aria-hidden="true" />
                Open resume
                <ArrowUpRight className="ml-auto size-3 text-fg-3" aria-hidden="true" />
              </Item>
              <Item
                onSelect={() => run(() => window.open(site.socials.github, "_blank"))}
              >
                <ArrowUpRight className="size-4 text-fg-3" aria-hidden="true" />
                GitHub
              </Item>
              <Item
                onSelect={() =>
                  run(() => window.open(site.socials.linkedin, "_blank"))
                }
              >
                <ArrowUpRight className="size-4 text-fg-3" aria-hidden="true" />
                LinkedIn
              </Item>
            </Group>
          </Command.List>
        </Command>
      </div>
    </Command.Dialog>
  );
}

function Group({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <Command.Group
      heading={heading}
      className="[&_[cmdk-group-heading]]:label [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-fg-3"
    >
      {children}
    </Command.Group>
  );
}

function Item({
  children,
  onSelect,
}: {
  children: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-control px-3 py-2.5 text-sm text-fg-2 data-[selected=true]:bg-raised data-[selected=true]:text-fg"
    >
      {children}
    </Command.Item>
  );
}
