import Snackbar from 'react-native-snackbar'

export default function showOfflineSnackbarMessage(): void {
    Snackbar.show({
        title: "The content will refresh when you're back online",
        color: 'white',
        duration: 4000,
    })
}
