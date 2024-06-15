/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Icon } from './Icon';
import search from '@icons/Property_2_Search_vjopxj.svg';
import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Input,
    InputGroup,
    InputLeftElement,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    InputRightElement,
    Spinner,
    Text,
    Image,
    Flex,
    Stack,
} from '@chakra-ui/react';
import { useSearchProductsMutation } from '@productize/redux';
import { Link } from 'react-router-dom';

// interface SearchProps {
//     color?: string;
//     width?: string;
//     size?: string;
// }

// interface SearchResult {
//     result?: object;
// }

export const SearchComp = ({ color, width, size }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchProducts, { isLoading, isError }] = useSearchProductsMutation();

    // Debounce search term changes
    const debouncedSearch = useCallback(
        debounce(async (term) => {
            if (term) {
                const res = await searchProducts({ text: term });
                setSearchResults(res.data.data);
            }
        }, 300),
        []
    );

    useEffect(() => {
        if (searchTerm) {
            onOpen();
            debouncedSearch(searchTerm);
        } else {
            onClose();
        }
    }, [searchTerm, onOpen, onClose, debouncedSearch]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Box>
            <InputGroup size={size}>
                <InputLeftElement pointerEvents="none" fontSize="1.2em">
                    <Icon icon={search} name="search" />
                </InputLeftElement>
                <Input
                    value={searchTerm}
                    onChange={handleInputChange}
                    border="none"
                    placeholder="Search"
                    _placeholder={{ color: '#01010140' }}
                    maxW={width}
                    bgColor={color}
                />
            </InputGroup>

            <Modal isOpen={isOpen} onClose={onClose} size="4xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader pb={0}>
                        <InputGroup size={size}>
                            <InputLeftElement pointerEvents="none" fontSize="1.2em">
                                <Icon icon={search} name="search" />
                            </InputLeftElement>
                            <Input
                                value={searchTerm}
                                onChange={handleInputChange}
                                border="none"
                                placeholder="Search"
                                _placeholder={{ color: '#01010140' }}
                                bgColor="transparent"
                                _focus={{ boxShadow: 'none', outline: 'none' }}
                            />
                            <InputRightElement>
                                <ModalCloseButton zIndex={999} />
                            </InputRightElement>
                        </InputGroup>
                    </ModalHeader>
                    <ModalBody>
                        <hr />
                        <Tabs>
                            <TabList>
                                <Tab disabled py={8} gap={2}>
                                    <Text>All results</Text>
                                    <Text>{searchResults?.length}</Text>
                                </Tab>
                                <Tab disabled py={8} gap={2}>
                                    <Text>Projects</Text>
                                    <Text>0</Text>
                                </Tab>
                                <Tab disabled py={8} gap={2}>
                                    <Text>Files</Text>
                                    <Text>0</Text>
                                </Tab>
                                <Tab disabled py={8} gap={2}>
                                    <Text>Users</Text>
                                    <Text>0</Text>
                                </Tab>
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    {isLoading && <Spinner />}
                                    {isError && <Text color="red.500">Error fetching search results</Text>}
                                    {!isLoading && searchResults.length === 0 && <Text>No results found</Text>}
                                    {!isLoading && searchResults.length > 0 && (
                                        <Stack gap={4}>
                                            {searchResults.map((product) => (
                                                <SearchResultTemplate result={product} />
                                            ))}
                                        </Stack>
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    {isLoading ? (
                                        <Spinner />
                                    ) : searchResults.length === 0 ? (
                                        <Text>No results found</Text>
                                    ) : (
                                        searchResults?.map((project) => (
                                            <Box key={project.id} p={2} borderBottom="1px solid #ccc">
                                                {project.title}
                                            </Box>
                                        ))
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    {isLoading ? (
                                        <Spinner />
                                    ) : searchResults.length === 0 ? (
                                        <Text>No results found</Text>
                                    ) : (
                                        searchResults?.map((file) => (
                                            <Box key={file.id} p={2} borderBottom="1px solid #ccc">
                                                {file.title}
                                            </Box>
                                        ))
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    {isLoading ? (
                                        <Spinner />
                                    ) : searchResults.length === 0 ? (
                                        <Text>No results found</Text>
                                    ) : (
                                        searchResults?.map((user) => (
                                            <Box key={user.id} p={2} borderBottom="1px solid #ccc">
                                                {user.title}
                                            </Box>
                                        ))
                                    )}
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default SearchComp;

function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const SearchResultTemplate = ({ result }) => {
    // const [getSingleProducts_EXTERNAL, getAllProducts_EXTERNALStatus] = useGetSingleProduct_EXTERNALMutation();

    // const fetchData = async () => {
    //     try {
    //         const res = await getSingleProducts_EXTERNAL({ productID: result?.slug }).unwrap();
    //         console.log(res);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return (
        <Flex alignItems={`center`} justifyContent={`space-between`}>
            <Flex alignItems={`flex-end`} gap={2}>
                <Box w={`3rem`} h={`3rem`} borderRadius={4} overflow={`hidden`}>
                    <Image w={`100%`} h={`100%`} objectFit={`cover`} src={result?.thumbnail} alt={result?.title} />
                </Box>
                <Box>
                    <Text fontWeight={600}>{result?.title}</Text>
                    <Text fontSize={`xs`}>{result?.publisher}</Text>
                </Box>
            </Flex>
            <Link to={`/products/${result?.slug}`} color={`blue.500`}>
                <Text>view product</Text>
            </Link>
        </Flex>
    );
};
