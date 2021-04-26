import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { Credentials, StringTranslations } from '@crowdin/crowdin-api-client'
import { LangType, Link } from '@pancakeswap-libs/uikit'
import AppButton from 'components/AppButton'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import Swap from './Swap'
import { RedirectPathToSwapOnly } from './Swap/redirects'
import { EN, allLanguages } from '../constants/localisation/languageCodes'
import { LanguageContext } from '../hooks/LanguageContext'
import { TranslationsContext } from '../hooks/TranslationsContext'
import AppLogo from '../components/Svgs/AppLogo'
import UserBlock from '../components/UserBlock'

import useGetDocumentTitlePrice from '../hooks/useGetDocumentTitlePrice'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  min-height: 100vh;
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  position: fixed;
  left: 0;
  height: 64px;
  width: 100%;
  background-color: ${({ theme }) => theme.nav.background};
  border-bottom: ${({ theme }) => `solid 1px ${theme.colors.primary}`};
  z-index: 20;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px;
`

const NavActions = styled.div`
  display: flex;
  > :not(:first-child) {
    margin-left: 16px;
  }
`

const BodyWrapper = styled.div`
  margin-top: 64px;
  display: flex;
  min-height: calc(100vh - 64px);
  flex-direction: column;
  width: 100%;
  padding: 32px 16px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  justify-content: center;
  background: url('/images/background2.svg') no-repeat center center
`

const Marginer = styled.div`
  margin-top: 5rem;
`

const CACHE_KEY = 'pancakeSwapLanguage'

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined)
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined)
  const [translations, setTranslations] = useState<Array<any>>([])
  const apiKey = `${process.env.REACT_APP_CROWDIN_APIKEY}`
  const projectId = parseInt(`${process.env.REACT_APP_CROWDIN_PROJECTID}`)
  const fileId = 6

  const credentials: Credentials = {
    token: apiKey,
  }

  const stringTranslationsApi = new StringTranslations(credentials)

  const getStoredLang = (storedLangCode: string) => {
    return allLanguages.filter((language) => {
      return language.code === storedLangCode
    })[0]
  }

  useEffect(() => {
    const storedLangCode = localStorage.getItem(CACHE_KEY)
    if (storedLangCode) {
      const storedLang = getStoredLang(storedLangCode)
      setSelectedLanguage(storedLang)
    } else {
      setSelectedLanguage(EN)
    }
  }, [])

  const fetchTranslationsForSelectedLanguage = async () => {
    stringTranslationsApi
      .listLanguageTranslations(projectId, selectedLanguage.code, undefined, fileId, 200)
      .then((translationApiResponse) => {
        if (translationApiResponse.data.length < 1) {
          setTranslations(['error'])
        } else {
          setTranslations(translationApiResponse.data)
        }
      })
      .then(() => setTranslatedLanguage(selectedLanguage))
      .catch((error) => {
        setTranslations(['error'])
        console.error(error)
      })
  }

  useEffect(() => {
    if (selectedLanguage) {
      fetchTranslationsForSelectedLanguage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage])

  const handleLanguageSelect = (langObject: LangType) => {
    setSelectedLanguage(langObject)
    localStorage.setItem(CACHE_KEY, langObject.code)
  }

  useGetDocumentTitlePrice()
  
  return (
    <Suspense fallback={null}>
      <HashRouter>
        <AppWrapper>
          <LanguageContext.Provider
            value={{ selectedLanguage, setSelectedLanguage: handleLanguageSelect, translatedLanguage, setTranslatedLanguage }}
          >
            <TranslationsContext.Provider value={{ translations, setTranslations }}>
            <Wrapper>
              <StyledNav>
                <NavContainer>
                    <AppLogo />
                    <NavActions>
                      <UserBlock />
                      <AppButton variant="tertiary">
                        <Link href="http://app.bsclaunch.org/pools">APP</Link>
                      </AppButton>
                    </NavActions>
                </NavContainer>
              </StyledNav>
              {/* <Menu> */}
                <BodyWrapper>
                  <Popups />
                  <Web3ReactManager>
                    <Switch>
                      <Route exact strict path="/swap" component={Swap} />
                      {/* <Route exact strict path="/find" component={PoolFinder} />
                      <Route exact strict path="/pool" component={Pool} />
                      <Route exact path="/add" component={AddLiquidity} />
                      <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} /> */}

                      {/* Redirection: These old routes are still used in the code base */}
                      {/* <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
                      <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
                      <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} /> */}

                      <Route component={RedirectPathToSwapOnly} />
                    </Switch>
                  </Web3ReactManager>
                  <Marginer />
                </BodyWrapper>

              {/* </Menu> */}
              </Wrapper>
            </TranslationsContext.Provider>
          </LanguageContext.Provider>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  )
}
