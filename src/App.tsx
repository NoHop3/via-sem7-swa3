import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as ScThemeProvider } from 'styled-components';
import {
  useCustomTheme,
  useGetDeviceType,
  DeviceTypes,
  useAppDispatch,
  useAppSelector,
  setNotificationVisibility,
  Snackbar,
} from './shared';
import { Home, Error, Login, Register } from './pages';
import { Header, BottomNavigation } from './components';

function App() {
  const notification = useAppSelector((state) => state.notifications.notification);
  const theme = useCustomTheme();
  const dispatch = useAppDispatch();

  // Set background color for the root element
  const root = document.getElementById('root') as HTMLElement;
  root.style.backgroundColor = theme.palette.background.default;

  return (
    <ThemeProvider theme={theme}>
      <ScThemeProvider theme={theme}>
        <BrowserRouter>
          <div
            className="App"
            style={{
              backgroundColor: theme.palette.background.default,
            }}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Error />} />
            </Routes>
            <Snackbar
              open={notification.open}
              message={notification.message}
              type={notification.type}
              onClose={() => dispatch(setNotificationVisibility(false))}
              autoHideDuration={4000}
            />
            {useGetDeviceType() !== DeviceTypes.DESKTOP && <BottomNavigation />}
          </div>
        </BrowserRouter>
      </ScThemeProvider>
    </ThemeProvider>
  );
}

export default App;
