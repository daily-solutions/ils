import { Flex } from '../../../ui/Flex';
import { ToastViewport } from '../../../ui/Toast';
import { Sidebar } from '../Sidebar';
import { BottomTray } from './BottomTray';
import { Header } from './Header';
import { RightTray } from './RightTray';
import { View } from './View';

const MobileView = () => {
  return (
    <Flex
      css={{
        width: '100dvw',
        height: '100dvh',
        alignItems: 'center',
        justifyContent: 'center',
        background: '$background',
        color: '$baseText',
      }}
    >
      <Header />
      <View />
      <BottomTray />
      <RightTray />
      <Sidebar />
      <ToastViewport />
    </Flex>
  );
};

export default MobileView;
