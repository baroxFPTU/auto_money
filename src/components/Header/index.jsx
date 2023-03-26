import { Button, Container, Heading, HStack } from '@chakra-ui/react';
import MenuCustom from 'components/MenuCustom';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { openModal } from 'store/slices/uiSlice';
import ThemeModeSwitch from '../ThemeModeSwitch';
import { useEffect } from 'react';

function Header(props) {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const userAvatar = useSelector((state) => state.auth.user?.photoURL);
  const dispatch = useDispatch();
  const location = useLocation();

  const links = [
    {
      id: 0,
      href: '/',
      label: 'Home',
    },
    {
      id: 1,
      href: '/dashboard',
      label: 'Dashboard',
    },
    {
      id: 2,
      href: '/blog',
      label: 'Blog',
    },
  ];

  const routeStatus = {
    dashboard: location.pathname === '/dashboard',
  };
  const getVariant = (pathname) => (location?.pathname === pathname ? 'ghost' : '');

  const handleOpenSignInModal = () => {
    const action = openModal();
    return dispatch(action);
  };

  const renderMenu = (links, isSignedIn) => (
    <HStack columnGap={6}>
      <HStack columnGap={0}>
        {links.map((link) => (
          <Button
            key={link.id}
            variant={getVariant(link?.href)}
            colorScheme='brandPrimary'
            as={Link}
            to={link?.href}
          >
            {link?.label}
          </Button>
        ))}
      </HStack>
      {isSignedIn && <MenuCustom marginLeft={10} isSignedIn={isSignedIn} photoURL={userAvatar} />}
    </HStack>
  );

  return (
    <Container w='full' maxW='container.xl'>
      <HStack w='full' justify='space-between' pt={{ base: 5, md: 20 }} pb={{ base: 2, md: 10 }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link to='/'>
            <Heading size='xl'>Auto Money</Heading>
          </Link>
          <ThemeModeSwitch />
        </div>
        {!isSignedIn ? (
          <Button colorScheme='brandPrimary' variant='solid' onClick={handleOpenSignInModal}>
            Sign In
          </Button>
        ) : (
          renderMenu(links, isSignedIn)
        )}
      </HStack>
    </Container>
  );
}

export default Header;
