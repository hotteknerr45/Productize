import { Box, Flex, HStack, Skeleton, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {  SharedButton } from '@productize/ui';
import { LivetableControl } from './liveTableControl/LiveTableControl';
import { ProductCards } from '../../../../ProductCards';
import { EmptyState } from '../../../../empty-states/EmptyState';
import { LiveTable } from './LiveTable';
import { useLiveProducts } from './service';

const LiveTabActive = () => {
    const { liveProducts, isLoading } = useLiveProducts();

    if (isLoading) {
        return <LiveSkeleton />;
    }

    return (
        <Box>
            <Box mb={4}>
                <LivetableControl showRefreshBtn={false} />
            </Box>
            {!liveProducts?.length ? (
                <>
                    <ProductCards
                        padding={20}
                        bgPos={{ base: `-30%`, md: `initial` }}
                        img={'https://res.cloudinary.com/kingsleysolomon/image/upload/v1699951012/productize/Layer_1_m6pvyg_yz7oz1.png'}
                        bgColor={'purple.100'}
                        bgImg="https://res.cloudinary.com/kingsleysolomon/image/upload/v1699951010/productize/Layer_1_1_uhdwlr_l8njgb.png"
                    />
                    <EmptyState
                        content={{
                            title: 'You’re yet to publish a product.',
                            desc: 'Lorem ipsum dolor sit amet consectetur. Nec accumsan amet amet velit. Aliquam dictum id pellentesque aenean turpis nisl. Quam etiam.',
                        }}
                        textAlign={{ base: `center` }}
                        showImage={false}
                    >
                        <Link to={`/dashboard/products#draft`}>
                            <SharedButton
                                text={'Publish New Product'}
                                btnExtras={{
                                    leftIcon: `ei:plus`,
                                }}
                                width={'fit-content'}
                                height={'40px'}
                                bgColor={'purple.200'}
                                textColor={'white'}
                                borderRadius={'4px'}
                                fontSize={{ base: `sm`, md: `sm` }}
                            />
                        </Link>
                    </EmptyState>
                </>
            ) : (
                <LiveTable live tableData={liveProducts} />
            )}
        </Box>
    );
};

export default LiveTabActive;

export const LiveSkeleton = () => {
    return (
        <Box p={5}>
            <Flex justify="space-between" mb={6}>
                <HStack spacing={4}>
                    <Skeleton height="40px" width="240px" />
                    <Skeleton height="40px" width="120px" />
                    <Skeleton height="40px" width="40px" />
                </HStack>
                <HStack spacing={4}>
                    <Skeleton height="40px" width="120px" />
                </HStack>
            </Flex>
            <VStack>
                <Skeleton height="40px" width="100%" />
                <Skeleton height="40px" width="100%" />
                <Skeleton height="40px" width="100%" />
                <Skeleton height="40px" width="100%" />
                <Skeleton height="40px" width="100%" />
                <Skeleton height="40px" width="100%" />
            </VStack>
        </Box>
    );
};
