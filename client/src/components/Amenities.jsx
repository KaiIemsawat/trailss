import IconTent from "../assets/icons/campIcon";
import IconCampfire from "../assets/icons/campfireIcon";
import IconDog from "../assets/icons/dogIcon";
import IconCloudMoon from "../assets/icons/moonIcon";
import IconParkingSquare from "../assets/icons/parkingIcon";
import IconSignpost2 from "../assets/icons/postIcon";
import IconTicket from "../assets/icons/ticketIcon";
import IconToiletsPortable from "../assets/icons/toletIcon";
import IconWheelchairLine from "../assets/icons/wheelchairIcon";

export default function Amenities({ selected, onChange }) {
    function checkboxClickHandler(e) {
        const { checked, name } = e.target;
        if (checked) {
            onChange([...selected, name]);
            console.log(name);
        } else {
            onChange([
                ...selected.filter((selectedName) => selectedName !== name),
            ]);
        }
    }
    const btnEffect =
        "border p-4 flex rounded-2xl gap-2 items-center cursor-pointer hover:bg-secondary/10 duration-200";

    return (
        <>
            <label className={btnEffect}>
                <IconWheelchairLine className="text-secondary" />
                <input
                    type="checkbox"
                    checked={selected.includes("wheelchair")}
                    name="wheelchair"
                    onChange={checkboxClickHandler}
                    className="accent-primary"
                />
                <span className="text-slate-500">Wheelchair</span>
            </label>
            <label className={btnEffect}>
                <IconParkingSquare className="text-secondary" />
                <input
                    type="checkbox"
                    checked={selected.includes("parking")}
                    name="parking"
                    onChange={checkboxClickHandler}
                    className="accent-primary"
                />
                <span className="text-slate-500">Parking</span>
            </label>
            <label className={btnEffect}>
                <IconTent className="text-secondary" />
                <input
                    type="checkbox"
                    checked={selected.includes("campsite")}
                    name="campsite"
                    onChange={checkboxClickHandler}
                    className="accent-primary"
                />
                <span className="text-slate-500">Campsite</span>
            </label>
            <label className={btnEffect}>
                <IconCloudMoon className="text-secondary" />
                <input
                    type="checkbox"
                    checked={selected.includes("night usage")}
                    name="night usage"
                    onChange={checkboxClickHandler}
                    className="accent-primary"
                />
                <span className="text-slate-500">Night usage</span>
            </label>
            <label className={btnEffect}>
                <IconTicket className="text-secondary" />
                <input
                    type="checkbox"
                    checked={selected.includes("permit required")}
                    name="permit required"
                    onChange={checkboxClickHandler}
                    className="accent-primary"
                />
                <span className="text-slate-500">Permit required</span>
            </label>
            <label className={btnEffect}>
                <IconDog className="text-secondary" />
                <input
                    type="checkbox"
                    checked={selected.includes("pets")}
                    name="pets"
                    onChange={checkboxClickHandler}
                    className="accent-primary"
                />
                <span className="text-slate-500">Pets Allow</span>
            </label>
            <label className={btnEffect}>
                <IconCampfire className="text-secondary" />
                <input
                    type="checkbox"
                    checked={selected.includes("backcountry")}
                    name="backcountry"
                    onChange={checkboxClickHandler}
                    className="accent-primary"
                />
                <span className="text-slate-500">Backcountry</span>
            </label>
            <label className={btnEffect}>
                <IconSignpost2 className="text-secondary" />
                <input
                    type="checkbox"
                    checked={selected.includes("guide mark")}
                    name="guide mark"
                    onChange={checkboxClickHandler}
                    className="accent-primary"
                />
                <span className="text-slate-500">Guide mark</span>
            </label>
            <label className={btnEffect}>
                <IconToiletsPortable className="text-secondary" />
                <input
                    type="checkbox"
                    checked={selected.includes("restroom")}
                    name="restroom"
                    onChange={checkboxClickHandler}
                    className="accent-primary"
                />
                <span className="text-slate-500">Restroom</span>
            </label>
        </>
    );
}
