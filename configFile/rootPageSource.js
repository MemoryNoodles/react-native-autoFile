module.exports = ()=>{
    return `/* 主界面 */
            class IconWithBadge extends React.Component {
                render() {
                    const { name, badgeCount, color, size, src } = this.props;
                    return (
                        <View key={name} style={{ margin: 5 }}>
                            <Image
                                style={{ width: pTd(45), height: pTd(45) }}
                                source={src}
                            />
                        </View>
                    );
                }
            }
            
            const HomeIconWithBadge = props => {
                return <IconWithBadge {...props} badgeCount={props.badgeCount} />;
            };\n\n`
    }




