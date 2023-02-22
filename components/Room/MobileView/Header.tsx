import { Flex } from '../../../ui/Flex';
import { ViewerCount } from '../Tray/ViewerCount';

export const Header = () => {
  return (
    <Flex
      css={{
        zIndex: 99,
        position: 'absolute',
        width: '100%',
        top: 20,
        justifyContent: 'flex-end',
        px: '$2',
      }}
    >
      <ViewerCount isMobile />
    </Flex>
  );
};
