import App, { Container } from 'next/app';
import Page from '../components/Page';

// cool thing is that MyApp can have local state/redux store/mobx store etc that persists on each page.
class MyApp extends App {
    render() {
        // 'Component' is sell or index or whatever component
        const { Component } = this.props;

        return (
            <Container>
                <p>Hey, I'm on every page</p>
                <Page>
                    <Component />
                </Page>
            </Container>
        );
    }
};

export default MyApp;