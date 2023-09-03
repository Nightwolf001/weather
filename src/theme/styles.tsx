import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1.5,
        padding: 16,
    },
    loader: {
        alignSelf: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        resizeMode: "contain",
        backGroundPosition: 'top',
    },
    image_container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    current_temp: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 55,
        color: '#fff',
    },
    current_temp_desc: {
        marginTop: 10,
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 26,
        color: '#fff',
    },
    row_wrapper : {
        flexDirection: 'row',
        width: '100%',
    },
    grid: {
        flex: 1,
        flexDirection: 'column',
    },
    divider: {
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        marginTop: 15,
        marginBottom: 25,
    },
    item_start: {
        alignItems: 'center',
        alignSelf: 'flex-start'
    },
    item_center: {
        alignItems: 'center',
        alignSelf: 'center'
    },
    item_end: {
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    body1: {
        fontSize: 18,
        color: '#fff',
    },
    body2: {
        fontSize: 14,
        color: '#fff',
    },
    icon_wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
    },
});

export { styles }