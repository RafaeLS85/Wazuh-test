import React, { useState, useEffect } from "react";
import { i18n } from "@osd/i18n";
import { FormattedMessage, I18nProvider } from "@osd/i18n/react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  DashboardContainerInput,
  DashboardStart,
} from "../../../../src/plugins/dashboard/public";
import {
  EuiButton,
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageContentHeader,
  EuiPageHeader,
  EuiTitle,
  EuiText,
} from "@elastic/eui";

import { CoreStart } from "../../../../src/core/public";
import { NavigationPublicPluginStart } from "../../../../src/plugins/navigation/public";
import { PLUGIN_ID, PLUGIN_NAME } from "../../common";
import Todos from "./todo/todos";
import { TodoService } from "../../services/todos";
import { useTodos } from "../../hooks/useTodos";
import CreateTodo from "./todo/create-todo";

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
  // Use React hooks to manage state.

  const { items, handleSave } = useTodos(http, notifications);

  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.
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
                  
                  {/* <EuiButton type="primary" size="s" onClick={getAll}>
                    <FormattedMessage
                      id="customPlugin.buttonText"
                      defaultMessage="GET"
                    />
                  </EuiButton> */}
                  
                  {/* ---------todo-app----------- */}
                  <CreateTodo
                    http={http}
                    notifications={notifications}
                    saveTodo={handleSave}
                  />

                  {!items && <p>Loading...</p>}

                  {items && <Todos todos={items} />}
                  {/* ------------------------- */}
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </>
      </I18nProvider>
    </Router>
  );
};
