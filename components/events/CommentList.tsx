import { MessageCircle } from "lucide-react";
import { Comment } from "@/types/event";

type CommentListProps = {
  comments: Comment[];
};

export function CommentList({ comments }: CommentListProps) {
  return (
    <section className="glass-card rounded-2xl p-5">
      <h3 className="mb-4 inline-flex items-center gap-2 text-base font-semibold text-white">
        <MessageCircle className="size-4" />
        Community comments
      </h3>
      <ul className="space-y-3">
        {comments.map((comment) => (
          <li key={comment.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-white">{comment.author}</p>
              <span className="text-xs text-slate-400">{comment.timeAgo}</span>
            </div>
            <p className="mt-1 text-sm text-slate-300">{comment.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
