import { Loader2 } from "lucide-react";

function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 w-full h-full opacity-50 bg-black"></div>
            <Loader2 className="h-12 w-12 animate-spin text-white" />
        </div>
    );
}

export default Loading;
