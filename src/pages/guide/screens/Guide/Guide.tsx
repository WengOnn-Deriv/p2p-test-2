import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { useHistory, useLocation } from 'react-router-dom';
import { PageReturn } from '@/components';
import { BUY_SELL_URL } from '@/constants';
import { Localize, useTranslations } from '@deriv-com/translations';
import { Text, useDevice } from '@deriv-com/ui';
import { LocalStorageConstants, LocalStorageUtils } from '@deriv-com/utils';
import { Awareness } from '../Awareness';
import { Blog } from '../Blog';
import { FAQs } from '../FAQs';
import { GettingStarted } from '../GettingStarted';
import { Videos } from '../Videos';
import './Guide.scss';

const Guide = () => {
    const history = useHistory();
    const location = useLocation();
    const { localize } = useTranslations();
    const { isDesktop, isMobile } = useDevice();
    const guideContentRef = useRef<HTMLDivElement>(null);
    const guideSections = [
        { className: 'p-[2.4rem]', component: <GettingStarted />, title: 'Getting Started' },
        { className: 'p-[2.4rem]', component: <Awareness />, title: 'Awareness' },
        { component: <Videos />, title: 'Videos' },
        { component: <Blog />, title: 'Blog' },
        { component: <FAQs guideContentRef={guideContentRef} />, title: 'FAQs' },
    ];

    useEffect(() => {
        LocalStorageUtils.setValue<boolean>(LocalStorageConstants.p2pShowFollowUserGuide, false);
    }, []);

    return (
        <div className='guide'>
            <PageReturn
                className='lg:mt-0'
                data-testid='dt_page_return_btn'
                hasBorder={!isDesktop}
                onClick={() => history.push((location.state as { from: string })?.from || BUY_SELL_URL)}
                pageTitle={localize('P2P Guide')}
                size={isMobile ? 'lg' : 'md'}
                weight='bold'
            />
            <div className='guide__content' ref={guideContentRef}>
                <Text as='div' size={isDesktop ? 'lg' : 'md'} weight='bold'>
                    <Localize i18n_default_text='Get started with P2P' />
                </Text>
                {guideSections.map(section => {
                    const { className, component, title } = section;
                    return (
                        <div className={clsx('guide__content-section', className)} key={title}>
                            {component}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Guide;
