
({ tintColor, focused }) => (
    <HomeIconWithBadge
        src={
            focused
                ? require("./assets/images/barIcon/find-select.png")
                : require("./assets/images/barIcon/find-normal.png")
        }
    />
)