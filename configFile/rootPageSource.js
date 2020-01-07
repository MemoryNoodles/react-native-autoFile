module.exports = ()=>{
    return `/* 主界面 */
            class MenuIcon extends React.Component {
                render() {
                    const { name,  src } = this.props;
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
             \n\n`
    }




