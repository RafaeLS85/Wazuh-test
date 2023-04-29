import React from "react";
import { FormattedMessage, I18nProvider } from "@osd/i18n/react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";
import { CoreStart } from "../../../../src/core/public";
import { NavigationPublicPluginStart } from "../../../../src/plugins/navigation/public";
import { PLUGIN_ID, PLUGIN_NAME } from "../../common";
import Todos from "./todo/todos";
import { useTodos } from "../../hooks/useTodos";
import CreateTodo from "./todo/create-todo";
import Loading from "./loading";
import SearchTodo from "./todo/search-todo";

interface CustomPluginAppDeps {
  basename: string;
  navigation: NavigationPublicPluginStart;
  notifications: CoreStart["notifications"];
  http: CoreStart["http"];
}

export const CustomPluginApp = ({
  basename,
  navigation,
  http,
  notifications,
}: CustomPluginAppDeps) => {
  const { items, handleSave, handleDelete, handleComplete } = useTodos(
    http,
    notifications
  );

  return (
    <Router basename={basename}>
      <I18nProvider>
        <>
          <navigation.ui.TopNavMenu
            appName={PLUGIN_ID}
            showSearchBar={true}
            useDefaultBehaviors={true}
          />
          <EuiPage restrictWidth="1000px">
            <EuiPageBody component="main">
              <EuiPageHeader>
                <EuiTitle size="l">
                  <h1>
                    <FormattedMessage
                      id="customPlugin.helloWorldText"
                      defaultMessage="{name}"
                      values={{ name: PLUGIN_NAME }}
                    />
                  </h1>
                </EuiTitle>
              </EuiPageHeader>
              <EuiPageContent>
                <EuiPageContentBody>
                  <EuiFlexGroup justifyContent="spaceAround">
                    <EuiFlexItem grow={false}>
                      <SearchTodo />
                    </EuiFlexItem>
                  </EuiFlexGroup>
                  <EuiFlexGroup justifyContent="spaceAround">
                    <EuiFlexItem grow={false}>
                      <CreateTodo saveTodo={handleSave} />
                      {!items && <Loading />}
                      {items && (
                        <Todos
                          todos={items}
                          deleteTodo={handleDelete}
                          handleComplete={handleComplete}
                        />
                      )}
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </>
      </I18nProvider>
    </Router>
  );
};
