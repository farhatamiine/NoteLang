import {FileText} from "lucide-react";
import {COMMON_STYLES} from "@/components/profile/profileStyle";

interface StatsCardProps {
    noteCount?: number
}

const StatsCard = ({noteCount}: StatsCardProps) => (
    <div className={COMMON_STYLES.section + " p-4"}>
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <FileText className="w-4 h-4 text-gray-600"/>
                <span className="text-gray-800">Notes Created:</span>
            </div>
            <span className="text-lg font-semibold text-black">{noteCount}</span>
        </div>
    </div>
);


export default StatsCard;