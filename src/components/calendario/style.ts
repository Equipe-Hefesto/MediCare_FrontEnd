import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 15,
        marginTop: 20
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    monthContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    yearContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    month: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    year: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 5,
    },
    weekDay: {
        width: '14.28%',
        textAlign: 'center',
        fontWeight: '600',
        color: '#555',
        fontSize: 12,
    },
    dayCell: {
        width: '14.28%',
        height: 90,
        borderWidth: 0.5,
        borderColor: '#ddd',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 5,
        backgroundColor: '#fff',
    },
    dayOutsideMonth: {
        backgroundColor: '#eee'
    },
    dayNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#444'
    },
    dayNumberOutside: {
        color: '#999'
    },
    reminderText: {
        marginTop: 4,
        marginHorizontal: 1,
        fontSize: 10,
        fontWeight: '600',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 3,
        overflow: 'hidden',
    },
    todayCell: {
        borderColor: '#267797',
        borderWidth: 2,
        borderRadius: 8
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '85%',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#004D61',
        marginBottom: 10,
    },
    modalLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#004D61',
        width: 200
    },
    modalText: {
        fontSize: 14,
        color: '#888',
        marginTop: 2
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#004D61',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        alignSelf: 'flex-end',
    },
    hora:{
        textAlignVertical:"center",
         fontWeight: 'bold',
    }
    
});
