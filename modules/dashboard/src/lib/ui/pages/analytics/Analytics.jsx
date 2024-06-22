/* eslint-disable @nx/enforce-module-boundaries */
import { Box, Flex, Select, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LineChart from './charts/Chart1';
import style from './scss/graph.module.scss';

import { AnalyticsTable } from './AnalyticsTable';
import { DataWidgetCard } from '../../DataWidgetCard';
import { DashboardEmptyState } from '../../empty-states/DashboardEmptyState';
import { selectProductAnalytics, useGetProductAnalyticsMutation } from '@productize/redux';
import { useCurrency } from '@productize/hooks';

export const Analytics = () => {
    const [getProductAnalytics, { isLoading }] = useGetProductAnalyticsMutation();
    const formatCurrency = useCurrency();
    const productAnalysis = useSelector(selectProductAnalytics);
    const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });

    useEffect(() => {
        getProductAnalytics(null).unwrap();
    }, [getProductAnalytics]);

    const EmptyStateDisplay = () => (
        <DashboardEmptyState
            content={{
                title: '',
                desc: 'You do not have Customer activities yet.',
                img: `https://res.cloudinary.com/kingsleysolomon/image/upload/v1700317427/productize/Illustration_4_pujumv.png`,
            }}
            textAlign={{ base: `center` }}
            showImage
        />
    );

    const ActiveStateDisplay = () => (
        <Box my={8}>
            <Box>
                <SimpleGrid gap={4} my={4} columns={{ base: 1, sm: 2, md: 3 }}>
                    <DataWidgetCard showIcon={false} title="Order" value={0} />
                    <DataWidgetCard showIcon={false} title="Views" value={0} />
                    <DataWidgetCard showIcon={false} title="Revenue" value={formatCurrency(productAnalysis.total_revenues)} />
                    <DataWidgetCard showIcon={false} title="New Order" value={productAnalysis.new_orders} />
                    <DataWidgetCard showIcon={false} title="New Order Revenue" value={formatCurrency(productAnalysis.new_orders_revenue)} />
                    <DataWidgetCard showIcon={false} title="Total Products" value={productAnalysis.total_products} />
                </SimpleGrid>
            </Box>

            <Box my={10}>
                <Text as="h6">Revenue Overview</Text>
                <Box mt={4}>
                    {productAnalysis.total_products === 0 ? (
                        <EmptyStateDisplay />
                    ) : (
                        <section className={style.graphCard}>
                            <div className={style.header}>
                                <Flex w="100%" justifyContent="flex-end" alignItems="center" className={style.title} gap={5}>
                                    <Select placeholder="Months" defaultValue={currentMonth}>
                                        <option value="January">January</option>
                                        <option value="February">February</option>
                                        <option value="March">March</option>
                                        <option value="April">April</option>
                                        <option value="May">May</option>
                                        <option value="June">June</option>
                                        <option value="July">July</option>
                                        <option value="August">August</option>
                                        <option value="September">September</option>
                                        <option value="October">October</option>
                                        <option value="November">November</option>
                                        <option value="December">December</option>
                                    </Select>
                                    <Select disabled placeholder="View By Digital Product">
                                        <option value="digital-product">Digital Product</option>
                                        <option value="print-on-demand">Print on demand</option>
                                        <option value="video-stream">Video streaming</option>
                                        <option value="subscription">Subscription</option>
                                    </Select>
                                </Flex>
                            </div>
                            <div className={style.imgWrapper}>
                                <LineChart />
                            </div>
                            <Box my={10}>
                                <Text as="h6" my={5}>
                                    Top Product
                                </Text>
                                <AnalyticsTable />
                            </Box>
                        </section>
                    )}
                </Box>
            </Box>
        </Box>
    );

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return productAnalysis.total_products ? <ActiveStateDisplay /> : <EmptyStateDisplay />;
};

export default Analytics;
