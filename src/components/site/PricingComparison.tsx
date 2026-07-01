import { Fragment, useState } from "react";
import { motion, LayoutGroup } from "motion/react";
import { Check, Minus, Sparkles, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Cell = boolean | string | number;
type Row = { label: string; values: [Cell, Cell, Cell]; indent?: number };
type Section = { title: string; rows: Row[] };

const TIERS = ["Grow", "Pro", "Scale"] as const;

const SECTIONS: Section[] = [
  {
    title: "Customizations",
    rows: [
      { label: "Custom Property Fields", values: [true, true, true] },
      { label: "Custom Field Groups", values: [true, true, true], indent: 1 },
      { label: "Custom Field Sections", values: [true, true, true], indent: 1 },
      { label: "Custom Fields", values: [true, true, true], indent: 1 },
      { label: "Custom Client Types", values: [true, true, true], indent: 1 },
      { label: "Merge Fields", values: [true, true, true] },
      { label: "Contact Roles", values: [true, true, true] },
      { label: "Contact Groups", values: [true, true, true] },
      { label: "Contact Businesses", values: [true, true, true] },
      { label: "Files Roles", values: [true, true, true] },
      { label: "Lead Sources", values: [true, true, true] },
      { label: "Add/Edit Federal Holidays", values: [false, true, true] },
    ],
  },
  {
    title: "Transactions",
    rows: [
      { label: "Property Specific Timezone", values: [true, true, true] },
      { label: "Manual Intake Form", values: [true, true, true] },
      { label: "Agent Intake Forms", values: [4, "Unlimited", "Unlimited"] },
      { label: "Dotloop Import", values: [false, true, true] },
      { label: "SkySlope Import", values: [false, true, true] },
      { label: "Brokermint Import", values: [false, true, true] },
      { label: "Ability to Duplicate", values: [true, true, true] },
    ],
  },
  {
    title: "Tasks",
    rows: [
      { label: "Sub-Tasks", values: [true, true, true] },
      { label: "Assign Users & Roles", values: [true, true, true] },
      { label: "Dynamic Dates", values: [true, true, true] },
      { label: "Coloring", values: [true, true, true] },
      { label: "Recurring", values: [true, true, true] },
      { label: "Tags", values: [true, true, true] },
      { label: "Follow Up Boss Integrated", values: [true, true, true] },
      { label: "Task Automation", values: [true, true, true] },
      { label: "Task Triggers", values: [3, "Unlimited", "Unlimited"] },
      { label: "Send Emails From Task", values: [true, true, true], indent: 1 },
      { label: "Add Emails to Queue", values: [true, true, true], indent: 2 },
      { label: "Schedule Trigger Emails", values: [false, true, true], indent: 2 },
      { label: "Send Emails Automatically", values: [false, true, true], indent: 2 },
      { label: "Send Texts From Task", values: [true, true, true], indent: 1 },
      { label: "Add Texts to Queue", values: [true, true, true], indent: 2 },
      { label: "Schedule Trigger Texts", values: [false, true, true], indent: 2 },
      { label: "Send Texts Automatically", values: [false, true, true], indent: 2 },
      { label: "Task Trigger Conditions", values: [false, true, true] },
      { label: "Task Locking", values: [false, true, true] },
    ],
  },
  {
    title: "Emails",
    rows: [
      { label: "Smart Blocks", values: [25, "Unlimited", "Unlimited"] },
      { label: "Merge Fields", values: [true, true, true] },
      { label: "Scheduled Emails", values: [true, true, true] },
      { label: "Auto Attach Documents", values: [true, true, true] },
      { label: "Auto Attach Contacts", values: [true, true, true] },
      { label: "Auto Attach Signature", values: [true, true, true] },
      { label: "Send Via Google Workspace API", values: [true, true, true] },
      { label: "Send Via Outlook API", values: [true, true, true] },
      { label: "Send Via SendGrid", values: [false, true, true] },
      { label: "API Email Inbox", values: [false, true, true] },
      { label: "API Email Property Sync", values: [false, true, true] },
    ],
  },
  {
    title: "Documents",
    rows: [
      { label: "Google Drive Sync", values: [true, true, true] },
      { label: "File Roles", values: [true, true, true] },
      { label: "Color Coding", values: [true, true, true] },
      { label: "Add Documents To Email", values: [true, true, true] },
      { label: "Split Documents", values: [false, true, true] },
      { label: "Merge Documents", values: [false, true, true] },
      { label: "Custom Status Buttons", values: [false, true, true] },
      { label: "Inbound Property Email Address", values: [false, true, true] },
      { label: "Add-on Documents", values: [false, true, true] },
    ],
  },
  {
    title: "Contacts & Commissions",
    rows: [
      { label: "Contacts", values: [true, true, true] },
      { label: "Property Commissions", values: [true, true, true] },
      { label: "Total Reports Per Property", values: [1, 3, "Unlimited"], indent: 1 },
      { label: "Commission Templates", values: [3, "Unlimited", "Unlimited"] },
    ],
  },
  {
    title: "Reporting",
    rows: [
      { label: "Total Reports", values: [1, 3, "Unlimited"] },
      { label: "Total Widgets Per Report", values: [4, 4, "Unlimited"], indent: 1 },
    ],
  },
  {
    title: "Messaging",
    rows: [
      { label: "Messaging", values: [true, true, true] },
      { label: "Reference Documents, Tasks, Emails, etc.", values: [true, true, true] },
      { label: "Send Messages to Agents", values: [true, true, true] },
      { label: "Send Messages to Clients", values: [true, true, true] },
      { label: "Send Messages to Team Members", values: [true, true, true] },
    ],
  },
  {
    title: "Task Pipeline",
    rows: [
      { label: "Filter By User", values: [true, true, true] },
      { label: "Filter By Team", values: [false, true, true] },
      { label: "Filter By Team Member", values: [false, true, true] },
      { label: "Property Filter Options", values: [true, true, true] },
    ],
  },
  {
    title: "Property Dates",
    rows: [
      { label: "Automatic Date Calculations", values: [true, true, true] },
      { label: "Add Dates to APIs (Google & Outlook)", values: [true, true, true] },
      { label: "Send API Date Invitations", values: [false, true, true], indent: 1 },
    ],
  },
  {
    title: "Templates",
    rows: [
      { label: "Agent Intake Form Templates", values: [4, "Unlimited", "Unlimited"] },
      { label: "Task Templates", values: [true, true, true] },
      { label: "Email Templates", values: [true, true, true] },
      { label: "Text Templates", values: [true, true, true] },
      { label: "Document Templates", values: [true, true, true] },
      { label: "Field Templates", values: [true, true, true] },
      { label: "Date Templates", values: [true, true, true] },
      { label: "Property Templates", values: [true, true, true] },
    ],
  },
  {
    title: "Teams, Roles & One-Sheets",
    rows: [
      { label: "Teams", values: [false, true, true] },
      { label: "Team Member Roles / Permissions", values: [false, true, true] },
      { label: "One-Sheets", values: [true, true, true] },
    ],
  },
  {
    title: "Integrations",
    rows: [
      { label: "Move Easy", values: [true, true, true] },
      { label: "SkySlope", values: [true, true, true] },
      { label: "Dotloop", values: [true, true, true] },
      { label: "Brokermint", values: [true, true, true] },
      { label: "Follow Up Boss", values: [true, true, true] },
      { label: "Stripe", values: [true, true, true] },
      { label: "DocuSign", values: [true, true, true] },
    ],
  },
  {
    title: "Phone Calls",
    rows: [
      {
        label: "Monthly Inbound & Outbound Minutes",
        values: ["250 / user", "250 / user", "250 / user"],
      },
      {
        label: "Additional Minutes",
        values: ["+10 add'l 250", "+10 add'l 250", "+10 add'l 250"],
        indent: 1,
      },
    ],
  },
  {
    title: "Portals",
    rows: [
      { label: "Agent Portals", values: ["FREE", "FREE", "FREE"] },
      { label: "Client Portals", values: ["FREE", "FREE", "FREE"] },
      { label: "Agent & Client Portal Roles / Permissions", values: [true, true, true] },
    ],
  },
  {
    title: "Tables & Segments",
    rows: [
      { label: "Contact Tables", values: [true, true, true] },
      { label: "Contacts CSV Export", values: [true, true, true], indent: 1 },
      { label: "Property Tables", values: [true, true, true] },
      { label: "Property Table Cell Colors", values: [true, true, true], indent: 1 },
      { label: "Properties CSV Export", values: [true, true, true], indent: 1 },
    ],
  },
  {
    title: "Texting",
    rows: [
      { label: "Texts Per Month", values: ["250 / user", "250 / user", "250 / user"] },
      {
        label: "Additional Texts",
        values: ["+$5 add'l 250", "+$5 add'l 250", "+$5 add'l 250"],
        indent: 1,
      },
    ],
  },
  {
    title: "Importing",
    rows: [
      { label: "Contacts", values: [true, true, true] },
      { label: "Task Templates", values: [true, true, true] },
      { label: "Email Templates", values: [true, true, true] },
      { label: "Text Templates", values: [true, true, true] },
      { label: "Properties", values: [true, true, true] },
    ],
  },
  {
    title: "API & Webhooks",
    rows: [
      { label: "API Access", values: [false, true, true] },
      { label: "Webhooks", values: [false, true, true] },
    ],
  },
  {
    title: "Mobile & Support",
    rows: [
      { label: "Mobile", values: [true, true, true] },
      { label: "Live Chat", values: [true, true, true] },
      { label: "Facebook Group", values: [true, true, true] },
      { label: "Support Center (Articles & Videos)", values: [true, true, true] },
      { label: "Email", values: [true, true, true] },
    ],
  },
];

function CellRender({ value }: { value: Cell }) {
  if (value === true)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-purple/10 text-brand-purple">
        <Check className="h-4 w-4" strokeWidth={3} />
      </span>
    );
  if (value === false)
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center text-muted-foreground/40">
        <Minus className="h-4 w-4" />
      </span>
    );
  return (
    <span className="text-sm font-semibold tabular-nums text-foreground">
      {value}
    </span>
  );
}

export function PricingComparison() {
  return (
    <section className="pb-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-6xl px-6 text-center"
      >
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-brand-pink">
          Full comparison
        </span>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight md:text-5xl">
          Compare all plans and{" "}
          <span className="text-gradient-hero">features</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Everything included in Grow, Pro, and Scale — side by side, so you can
          pick the plan that matches your workflow.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-10 max-w-6xl px-6"
      >
        {/* Mobile: single-plan accordion */}
        <MobileComparison />

        {/* Desktop: full table */}
        <div className="hidden overflow-hidden rounded-3xl border border-border bg-card shadow-card md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              {/* Sticky header */}
              <thead className="sticky top-0 z-10 bg-card/95 backdrop-blur">
                <tr className="border-b border-border">
                  <th className="sticky left-0 z-10 w-[40%] bg-card/95 px-4 py-5 text-sm font-semibold text-muted-foreground backdrop-blur sm:px-6">
                    Features
                  </th>
                  {TIERS.map((tier, i) => (
                    <th
                      key={tier}
                      className={cn(
                        "px-4 py-5 text-center sm:px-6",
                        i === 1 && "bg-brand-purple/5"
                      )}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-display text-lg font-bold text-foreground">
                          {tier}
                        </span>
                        {i === 1 && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-brand px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                            <Sparkles className="h-2.5 w-2.5" />
                            Popular
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {SECTIONS.map((section) => (
                  <Fragment key={section.title}>
                    <tr className="bg-muted/30">
                      <td
                        colSpan={4}
                        className="sticky left-0 px-4 py-3 text-xs font-bold uppercase tracking-wider text-brand-purple sm:px-6"
                      >
                        {section.title}
                      </td>
                    </tr>
                    {section.rows.map((row, ri) => (
                      <tr
                        key={section.title + "-" + ri}
                        className="border-t border-border/60 transition-colors hover:bg-muted/40"
                      >
                        <td
                          className="sticky left-0 z-[1] bg-card px-4 py-3 text-sm text-foreground/90 sm:px-6"
                          style={{ paddingLeft: `${16 + (row.indent ?? 0) * 16}px` }}
                        >
                          {row.label}
                        </td>
                        {row.values.map((v, i) => (
                          <td
                            key={i}
                            className={cn(
                              "px-4 py-3 text-center sm:px-6",
                              i === 1 && "bg-brand-purple/5"
                            )}
                          >
                            <CellRender value={v} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Need something not listed here?{" "}
          <a href="/contact" className="font-semibold text-foreground underline underline-offset-4">
            Talk to us about a custom plan
          </a>
          .
        </p>
      </motion.div>
    </section>
  );
}

/* ─────────── Mobile view: plan picker + accordion sections ─────────── */

function MobileComparison() {
  const [tierIdx, setTierIdx] = useState<0 | 1 | 2>(1);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="md:hidden">
      {/* Sticky segmented plan switcher — stays visible while browsing sections */}
      <div className="sticky top-16 z-20 -mx-6 px-6 pb-2 pt-2 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <LayoutGroup id="mobile-plan-switcher">
          <div
            role="tablist"
            aria-label="Select a plan to compare"
            className="relative grid grid-cols-3 gap-1 rounded-full border border-border bg-muted/60 p-1 shadow-sm"
          >
            {TIERS.map((tier, i) => {
              const active = i === tierIdx;
              return (
                <button
                  key={tier}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTierIdx(i as 0 | 1 | 2)}
                  className={cn(
                    "relative z-[1] rounded-full py-2 text-sm font-bold transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="mobile-plan-pill"
                      className="absolute inset-0 -z-[1] rounded-full bg-card shadow-md ring-1 ring-border/70"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative inline-flex items-center gap-1.5">
                    {tier}
                    {i === 1 && (
                      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-brand-pink" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      {/* Accordion sections */}
      <div className="mt-4 overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        {SECTIONS.map((section, si) => {
          const isOpen = openIdx === si;
          return (
            <div
              key={section.title}
              className={cn(
                "border-b border-border/60 last:border-b-0",
                isOpen && "bg-muted/20"
              )}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIdx(isOpen ? null : si)}
                className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-brand-purple">
                  {section.title}
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                />
              </button>
              {isOpen && (
                <ul className="divide-y divide-border/60 border-t border-border/60 bg-card">
                  {section.rows.map((row, ri) => (
                    <li
                      key={ri}
                      className="flex items-center justify-between gap-3 px-4 py-3"
                      style={{ paddingLeft: `${16 + (row.indent ?? 0) * 16}px` }}
                    >
                      <span className="min-w-0 pr-2 text-sm text-foreground/90">
                        {row.label}
                      </span>
                      <span className="shrink-0">
                        <CellRender value={row.values[tierIdx]} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        Showing features for{" "}
        <span className="font-semibold text-foreground">{TIERS[tierIdx]}</span>{" "}
        · tap a plan above to switch
      </p>
    </div>
  );
}
