import MenuItem from "./MenuItem";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { IoCalendarClearOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";

import img from '../../assets/delaware.png'

export default function MenuBar(){

    return (
        <div className="flex flex-col w-60 border border-[#E5E5E5] h-full bg-[#F9F9F9]">
            <div className="p-10 border-b border-[#E5E5E5]">
                <img className="h-11.5 w-38.5" src={img}/>
            </div>
            <MenuItem name='Dashboard' icon={LuLayoutDashboard}/>
            <MenuItem name='Mijn Planning' icon={IoCalendarOutline}/>
            <MenuItem name='Afwezigheden' icon={IoCalendarClearOutline} />
            <MenuItem name='Meldingen' icon={IoNotificationsOutline} />
        </div>
    )
}