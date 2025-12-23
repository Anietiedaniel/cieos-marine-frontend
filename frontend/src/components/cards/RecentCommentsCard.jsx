export default function RecentCommentsCard() {
  const comments = Array(3).fill({
    user: "John Hanks",
    issue: "issue-001",
    time: "3 hours ago",
    text: "The Generator has been fixed Issues has been resolved @Mr Johnson please be mindful of the oil gauge next time",
  });

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">Recent Comments</h3>
        <button className="text-green-700 text-xs font-semibold hover:underline">See more</button>
      </div>
      <div className="space-y-4">
        {comments.map((comment, i) => (
          <div key={i} className="flex gap-3">
            <div className="relative h-10 w-10 shrink-0">
              <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center border">👤</div>
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white"></span>
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-semibold text-gray-700">{comment.user}</span> 
                <span className="text-gray-400 mx-1 text-xs">Commented on</span>
                <span className="text-green-600 text-xs font-medium cursor-pointer">{comment.issue}</span>
              </p>
              <p className="text-[10px] text-gray-400 mb-1">{comment.time}</p>
              <div className="bg-gray-100 p-2 rounded-lg text-sm text-gray-600">
                {comment.text.split('@Mr Johnson').map((part, i, arr) => (
                  <span key={i}>
                    {part}{i !== arr.length - 1 && <span className="text-green-600 font-medium">@Mr Johnson</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}