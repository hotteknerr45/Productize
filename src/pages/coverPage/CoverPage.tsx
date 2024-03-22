import { AbsoluteCenter, Box, Center, Container, Divider, Flex, Image, Stack, Text } from '@chakra-ui/react';
import DefaultLayout from '../../layouts/Layout';
import CoverPageCard from './CoverPageCard';
import { useEffect, useState } from 'react';

export const CoverPage = () => {
    const [isMobileView, setMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            // Check if the viewport width is less than a certain threshold (e.g., 768px) to determine if it's a mobile view
            const isMobile = window.innerWidth < 768;
            setMobileView(isMobile);
        };

        // Call handleResize initially to set the initial state based on the viewport width
        handleResize();

        // Add event listener to listen for window resize events
        window.addEventListener('resize', handleResize);

        // Remove event listener when the component unmounts to avoid memory leaks
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <DefaultLayout removeFooter>
            <Stack gap={10}>
                <Container pos={`relative`} color={`grey.800`} mt={`8rem`} textAlign={`center`} maxW={`898px`}>
                    <Image pos={`absolute`} top={`12rem`} left={`-8rem`} src={``} />
                    <Text lineHeight={`shorter`} as={`h1`}>
                        Welcome to Productize!
                    </Text>
                    <Text fontWeight={400} as={`h5`} color={`grey.800`} mt={3}>
                        From Ebooks, video content, digital art/graphics, online courses or stock photos, you are spoilt for choice whether as a creator or as a
                        consumer.
                    </Text>
                </Container>
            </Stack>
            <Box my={10}>
                <Flex px={{ lg: 0 }} flexDir={{ base: `column`, lg: `row` }} gap={10} as={Container} maxW={`70rem`}>
                    <CoverPageCard
                        img={`https://res.cloudinary.com/kingsleysolomon/image/upload/v1711095666/productize/Frame_1171275923_aaduhl.png`}
                        desc={`Are you a digital artist, designer, writer, or developer looking to share your creations with the world and earn from your passion ?`}
                        buttonText={`Explore as Seller`}
                    />
                    <Box position="relative" padding="10">
                        <Divider h={isMobileView ? `.1rem` : `100%`} width={isMobileView ? `100%` : `.1rem`} bgColor={`purple.200`} />
                        <AbsoluteCenter bg={`white`}>
                            <Center
                                boxShadow={`0px 3.0280373096466064px 7.570093154907227px 2.2710280418395996px #6D5DD31A`}
                                h={`4rem`}
                                w={`4rem`}
                                borderRadius={`100%`}
                                p={4}
                            >
                                <Text fontSize={`3xl`} fontWeight={`bold`}>
                                    Or
                                </Text>
                            </Center>
                        </AbsoluteCenter>
                    </Box>
                    <CoverPageCard
                        img={`https://res.cloudinary.com/kingsleysolomon/image/upload/v1711095668/productize/Frame_1171275923_1_alpd8o.png`}
                        desc={`Are you in search of unique digital creations from talented artists, designers, writers, or developers? Your quest ends here!`}
                        buttonText={`Explore as Buyer`}
                    />
                </Flex>
            </Box>
        </DefaultLayout>
    );
};
