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
        flex: 1,
        flexDirection: 'row',
        width: '100%',
    },
    grid: {
        flex: 1,
        flexDirection: 'column',
    },
    xs_temp_max: {
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    xs_temp_min: { 
        alignItems: 'center',
        alignSelf: 'flex-start' 
    },
    xs_temp_current: {
        alignItems: 'center',
        alignSelf: 'center' 
    },
});

export { styles }