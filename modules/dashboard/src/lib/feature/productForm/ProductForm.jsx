import { Box, Button, Flex, FormControl, Progress, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import RadioCards from './components/RadioCards';
import { useState } from 'react';
import { Field } from './components/FormFields';
import RichTextField from './components/RichTextField';
import { CoverPhotoUploadField } from './components/CoverPhotoUploadField';
import { ThumbnailUploadField } from './components/ThumbnailUploadField';
import { HighLightField } from './components/HighlightField';
import TagsField from './components/TagsField';
import { DataUploadField } from './components/DataUploadField';
import MajorInputFields from './components/MajorInputFields';
import SkillSellingSubForm from './components/SkillSellingSubForm';

export const ProductForm = () => {
    const [isProgressCompleted, setProgressCompleted] = useState(false);
    const [selectedProductType, setSelectedProductType] = useState('digital_product');

    const listen = (value) => {
        setSelectedProductType(value);
        setProgressCompleted(false);
    };

    const handleNext = (e) => {
        if (e.target.innerText === `Next`) {
            setProgressCompleted(true);
        } else {
            setProgressCompleted(false);
        }
    };

    return (
        <div>
            {/* GRID ONE*/}
            <FormControl>
                <RadioCards listenForChange={listen} />
            </FormControl>
            <Box>
                <Text fontSize={`sm`} fontWeight={`semibold`}>
                    Step {isProgressCompleted ? 2 : 1} of 2
                </Text>
                <Progress size={`xs`} borderRadius={5} value={isProgressCompleted ? 100 : 50} colorScheme={`purple`} />
            </Box>
            <Stack hidden={isProgressCompleted}>
                <MajorInputFields />
                {/* GRID THREE */}
                <FormControl h={`21rem`} overflow={`hidden`}>
                    <RichTextField />
                </FormControl>
                {/* GRID FIVE */}
                <FormControl my={8} gap={4}>
                    <Field>
                        <CoverPhotoUploadField />
                    </Field>
                </FormControl>
                {/* GRID SIX */}
                <FormControl my={8} gap={4}>
                    <Field>
                        <ThumbnailUploadField />
                    </Field>
                </FormControl>
                {/* GRID SEVEN */}
                <FormControl as={SimpleGrid} my={8} gap={4} columns={{ base: 1, sm: 2 }}>
                    <Field>
                        <HighLightField />
                    </Field>
                </FormControl>
                {/* GRID EIGHT */}
                <FormControl as={SimpleGrid} my={8} gap={4} columns={{ base: 1, sm: 2 }}>
                    <Field>
                        <TagsField />
                    </Field>
                </FormControl>
            </Stack>
            {/* switch */}
            <Stack hidden={!isProgressCompleted}>
                {/* GRID FOUR */}
                <Stack hidden={selectedProductType === `digital_product` ? false : true}>
                    <FormControl my={8} gap={4}>
                        <DataUploadField />
                    </FormControl>
                </Stack>
                <Stack hidden={selectedProductType === `digital_product` ? true : false}>
                    <SkillSellingSubForm />
                </Stack>
            </Stack>
            <Flex gap={4} justifyContent={`flex-end`} mt={2}>
                <Button variant={`text`} onClick={handleNext}>
                    Back
                </Button>
                <Button variant={`text`} onClick={handleNext}>
                    Next
                </Button>
            </Flex>
        </div>
    );
};
