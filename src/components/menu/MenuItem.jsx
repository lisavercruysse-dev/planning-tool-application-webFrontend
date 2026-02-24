export default function MenuItem ({name, icon: Icon}) {
    return (
        <div className="flex gap-3 items-center px-8 py-3">
            <Icon size='25'/>
            <p>{name}</p>
        </div>
    )
}