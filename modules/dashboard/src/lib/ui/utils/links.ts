/* eslint-disable @nx/enforce-module-boundaries */
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import download from '@icons/Property_2_Downloads-folder_zb8tdq.svg';
import compass from '@icons/Property_2_Compass_jfe95t.svg';
import help from '@icons/Property_2_Chat_6_qlrj4q.svg';
import setting from '@icons/Property_2_Settings_4_tm54pe.svg';
import profile from '@icons/Property_2_User_iiqfxz.svg';
import product from '@icons/Property_2_Price_2_ugwdhq.svg';
import order from '@icons/Property_2_Cart_1_ubt3so.svg';
import analysis from '@icons/Property_2_Chart-pie_bygfly.svg';
import consumer from '@icons/Property_2_User-folder_n4spfl.svg';
import payment from '@icons/Property_2_Wallet_3_teopvy.svg';
import { selectCurrentUser, useMarkUnseenOrdersAsSeenMutation } from '@productize/redux';
import { useNotifications } from '../pages/notification/service';
import { useLocation } from 'react-router-dom';

interface link {
    id: number;
    name: string;
    path: string;
    type: boolean | string;
    icon: string;
    analysis: string | number | null;
}

export const useLinks = () => {
    const { pathname } = useLocation();
    const user = useSelector(selectCurrentUser);
    const [markUnseenOrdersAsSeen] = useMarkUnseenOrdersAsSeenMutation();
    const { count, fetchUnseenCount } = useNotifications();

    const makeunseenOrderSeen = useCallback(async () => {
        try {
            const res = await markUnseenOrdersAsSeen(null).unwrap();
            if (res) {
                fetchUnseenCount();
            }
        } catch (error) {
            return error;
        }
    }, [fetchUnseenCount, markUnseenOrdersAsSeen]);

    const [links1, setLinks1] = useState<Array<link>>();
    const [links2] = useState([
        {
            id: 1,
            name: `Downloads`,
            path: `downloads#all-downloads`,
            type: `free`,
            icon: download,
        },
        {
            id: 2,
            name: `Explore`,
            path: `/explore`,
            type: `free`,
            icon: compass,
        },
    ]);
    const [links3] = useState([
        {
            id: 1,
            name: `Help`,
            path: `help`,
            type: `free`,
            icon: help,
        },
        {
            id: 2,
            name: `Settings`,
            path: `settings`,
            type: `free`,
            icon: setting,
        },
        {
            id: 3,
            name: `Profile`,
            path: `profile/${user?.id}`,
            type: `free`,
            icon: profile,
        },
    ]);

    useEffect(() => {
        if (pathname.includes(`/orders`)) {
            makeunseenOrderSeen();
        }
        setLinks1([
            {
                id: 2,
                name: `Products`,
                path: `products#all-products`,
                type: `free`,
                icon: product,
                analysis: null,
            },
            {
                id: 3,
                name: `Orders`,
                path: `orders`,
                analysis: count,
                type: `free`,
                icon: order,
            },
            {
                id: 4,
                name: `Customers`,
                path: `customers`,
                type: `free`,
                icon: consumer,
                analysis: null,
            },
            {
                id: 5,
                name: `Payouts`,
                path: `payouts`,
                type: `free`,
                icon: payment,
                analysis: null,
            },
            {
                id: 6,
                name: `Analytics`,
                path: `analytics`,
                type: `free`,
                icon: analysis,
                analysis: null,
            },
        ]);
    }, [count, makeunseenOrderSeen, pathname]);

    return { links1, links2, links3 };
};
