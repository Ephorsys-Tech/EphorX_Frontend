import { ArrowRight, Megaphone, Zap } from "lucide-react";

import SectionHeading from "./SectionHeading";
import { formatRelativeTime } from "./dashboardUtils";

export default function CampaignActivity({
  campaignTitle,
  campaignDescription,
  hasCampaigns,
  activityItems,
  onCampaignAction,
}) {
  return (
    <div className="flex flex-col gap-5 lg:col-span-2 2xl:col-span-1">
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-indigo-800 via-purple-700 to-purple-500 p-5 text-white shadow-sm">
        <div className="relative z-10 max-w-[75%]">
          <h3 className="text-lg font-extrabold">{campaignTitle}</h3>

          <p className="mt-2 text-xs leading-relaxed text-purple-100">
            {campaignDescription}
          </p>

          <button
            type="button"
            onClick={onCampaignAction}
            className="mt-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-indigo-800 transition hover:-translate-y-0.5"
          >
            {hasCampaigns ? "View Campaign" : "Create Campaign"}
            <ArrowRight size={14} />
          </button>
        </div>

        <Megaphone
          size={75}
          className="absolute bottom-4 right-4 -rotate-12 text-white/80"
          strokeWidth={1.3}
        />
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <SectionHeading icon={Zap} title="Recent Activity" />

        <div className="space-y-4">
          {activityItems.length > 0 ? (
            activityItems.map((activity, index) => (
              <div
                key={`${activity.text}-${index}`}
                className="flex items-start gap-3"
              >
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500 ring-4 ring-blue-50" />

                <p className="flex-1 text-xs leading-relaxed text-slate-600">
                  {activity.text}
                </p>

                <span className="shrink-0 text-[10px] text-slate-400">
                  {formatRelativeTime(activity.date)}
                </span>
              </div>
            ))
          ) : (
            <p className="py-6 text-center text-sm text-slate-400">
              No recent activity available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
