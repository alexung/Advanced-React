import App, { Container } from "next/app";
import Page from "../components/Page";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";

// cool thing is that MyApp can have local state/redux store/mobx store etc that persists on each page.
class MyApp extends App {
  // getInitialProps is a special react lifecycle method.
  // Runs FIRST before anything else runs, so we get all data exposed as props
  // we need this because we're doing server side render??
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    // 'Component' is sell or index or whatever component
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <p>Hey, I'm on every page</p>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

// withData is a higher order function
export default withData(MyApp);
