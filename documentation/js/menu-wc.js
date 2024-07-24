'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">bulir-service documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-df776c188dbdf8a820dae0359b8eb0be4866840655a219c7e4250c8e264087d403b57cedba9a8840e85e7e63c024c04f45694f11a38623f584917f0443dfd91e"' : 'data-bs-target="#xs-controllers-links-module-AppModule-df776c188dbdf8a820dae0359b8eb0be4866840655a219c7e4250c8e264087d403b57cedba9a8840e85e7e63c024c04f45694f11a38623f584917f0443dfd91e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-df776c188dbdf8a820dae0359b8eb0be4866840655a219c7e4250c8e264087d403b57cedba9a8840e85e7e63c024c04f45694f11a38623f584917f0443dfd91e"' :
                                            'id="xs-controllers-links-module-AppModule-df776c188dbdf8a820dae0359b8eb0be4866840655a219c7e4250c8e264087d403b57cedba9a8840e85e7e63c024c04f45694f11a38623f584917f0443dfd91e"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-df776c188dbdf8a820dae0359b8eb0be4866840655a219c7e4250c8e264087d403b57cedba9a8840e85e7e63c024c04f45694f11a38623f584917f0443dfd91e"' : 'data-bs-target="#xs-injectables-links-module-AppModule-df776c188dbdf8a820dae0359b8eb0be4866840655a219c7e4250c8e264087d403b57cedba9a8840e85e7e63c024c04f45694f11a38623f584917f0443dfd91e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-df776c188dbdf8a820dae0359b8eb0be4866840655a219c7e4250c8e264087d403b57cedba9a8840e85e7e63c024c04f45694f11a38623f584917f0443dfd91e"' :
                                        'id="xs-injectables-links-module-AppModule-df776c188dbdf8a820dae0359b8eb0be4866840655a219c7e4250c8e264087d403b57cedba9a8840e85e7e63c024c04f45694f11a38623f584917f0443dfd91e"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-b3ffc19735be83177e527632430e63cc7665d0e67a66189d7a51f4576adc4be936c38de19589d2d4e5319a37628261d6209c415a23c098ca044796a41943104d"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-b3ffc19735be83177e527632430e63cc7665d0e67a66189d7a51f4576adc4be936c38de19589d2d4e5319a37628261d6209c415a23c098ca044796a41943104d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-b3ffc19735be83177e527632430e63cc7665d0e67a66189d7a51f4576adc4be936c38de19589d2d4e5319a37628261d6209c415a23c098ca044796a41943104d"' :
                                            'id="xs-controllers-links-module-AuthModule-b3ffc19735be83177e527632430e63cc7665d0e67a66189d7a51f4576adc4be936c38de19589d2d4e5319a37628261d6209c415a23c098ca044796a41943104d"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-b3ffc19735be83177e527632430e63cc7665d0e67a66189d7a51f4576adc4be936c38de19589d2d4e5319a37628261d6209c415a23c098ca044796a41943104d"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-b3ffc19735be83177e527632430e63cc7665d0e67a66189d7a51f4576adc4be936c38de19589d2d4e5319a37628261d6209c415a23c098ca044796a41943104d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-b3ffc19735be83177e527632430e63cc7665d0e67a66189d7a51f4576adc4be936c38de19589d2d4e5319a37628261d6209c415a23c098ca044796a41943104d"' :
                                        'id="xs-injectables-links-module-AuthModule-b3ffc19735be83177e527632430e63cc7665d0e67a66189d7a51f4576adc4be936c38de19589d2d4e5319a37628261d6209c415a23c098ca044796a41943104d"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ServiceModule.html" data-type="entity-link" >ServiceModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ServiceModule-f7bf21c4168dfd38685e003ae749b3dcbdd246660f809b6e3b10d7e03a24e95304fdb2fedccc5800e275db618ffa223f8159178444f5ec3e6043dda891eb1d41"' : 'data-bs-target="#xs-controllers-links-module-ServiceModule-f7bf21c4168dfd38685e003ae749b3dcbdd246660f809b6e3b10d7e03a24e95304fdb2fedccc5800e275db618ffa223f8159178444f5ec3e6043dda891eb1d41"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ServiceModule-f7bf21c4168dfd38685e003ae749b3dcbdd246660f809b6e3b10d7e03a24e95304fdb2fedccc5800e275db618ffa223f8159178444f5ec3e6043dda891eb1d41"' :
                                            'id="xs-controllers-links-module-ServiceModule-f7bf21c4168dfd38685e003ae749b3dcbdd246660f809b6e3b10d7e03a24e95304fdb2fedccc5800e275db618ffa223f8159178444f5ec3e6043dda891eb1d41"' }>
                                            <li class="link">
                                                <a href="controllers/ServiceController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServiceController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ServiceModule-f7bf21c4168dfd38685e003ae749b3dcbdd246660f809b6e3b10d7e03a24e95304fdb2fedccc5800e275db618ffa223f8159178444f5ec3e6043dda891eb1d41"' : 'data-bs-target="#xs-injectables-links-module-ServiceModule-f7bf21c4168dfd38685e003ae749b3dcbdd246660f809b6e3b10d7e03a24e95304fdb2fedccc5800e275db618ffa223f8159178444f5ec3e6043dda891eb1d41"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ServiceModule-f7bf21c4168dfd38685e003ae749b3dcbdd246660f809b6e3b10d7e03a24e95304fdb2fedccc5800e275db618ffa223f8159178444f5ec3e6043dda891eb1d41"' :
                                        'id="xs-injectables-links-module-ServiceModule-f7bf21c4168dfd38685e003ae749b3dcbdd246660f809b6e3b10d7e03a24e95304fdb2fedccc5800e275db618ffa223f8159178444f5ec3e6043dda891eb1d41"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ServiceService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServiceService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TransactionModule.html" data-type="entity-link" >TransactionModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TransactionModule-c111e977a56bbc625ce0573c1b22daccec3de45364e75dd4e1084b8b56188e46274bae1a1ad3cb934437ae176638e8456c263326e644f9c8970e7cbb383ecf67"' : 'data-bs-target="#xs-controllers-links-module-TransactionModule-c111e977a56bbc625ce0573c1b22daccec3de45364e75dd4e1084b8b56188e46274bae1a1ad3cb934437ae176638e8456c263326e644f9c8970e7cbb383ecf67"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TransactionModule-c111e977a56bbc625ce0573c1b22daccec3de45364e75dd4e1084b8b56188e46274bae1a1ad3cb934437ae176638e8456c263326e644f9c8970e7cbb383ecf67"' :
                                            'id="xs-controllers-links-module-TransactionModule-c111e977a56bbc625ce0573c1b22daccec3de45364e75dd4e1084b8b56188e46274bae1a1ad3cb934437ae176638e8456c263326e644f9c8970e7cbb383ecf67"' }>
                                            <li class="link">
                                                <a href="controllers/TransactionController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TransactionModule-c111e977a56bbc625ce0573c1b22daccec3de45364e75dd4e1084b8b56188e46274bae1a1ad3cb934437ae176638e8456c263326e644f9c8970e7cbb383ecf67"' : 'data-bs-target="#xs-injectables-links-module-TransactionModule-c111e977a56bbc625ce0573c1b22daccec3de45364e75dd4e1084b8b56188e46274bae1a1ad3cb934437ae176638e8456c263326e644f9c8970e7cbb383ecf67"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TransactionModule-c111e977a56bbc625ce0573c1b22daccec3de45364e75dd4e1084b8b56188e46274bae1a1ad3cb934437ae176638e8456c263326e644f9c8970e7cbb383ecf67"' :
                                        'id="xs-injectables-links-module-TransactionModule-c111e977a56bbc625ce0573c1b22daccec3de45364e75dd4e1084b8b56188e46274bae1a1ad3cb934437ae176638e8456c263326e644f9c8970e7cbb383ecf67"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TransactionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TransactionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-bcd72083a6397e7835b84005321c2239251e3a7f3bd04272b04329a1dd18b3ff45c4953906ced29b5a6d27f01e7a6540b696107e3fe959afe378b6e4e3b3c5a3"' : 'data-bs-target="#xs-controllers-links-module-UserModule-bcd72083a6397e7835b84005321c2239251e3a7f3bd04272b04329a1dd18b3ff45c4953906ced29b5a6d27f01e7a6540b696107e3fe959afe378b6e4e3b3c5a3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-bcd72083a6397e7835b84005321c2239251e3a7f3bd04272b04329a1dd18b3ff45c4953906ced29b5a6d27f01e7a6540b696107e3fe959afe378b6e4e3b3c5a3"' :
                                            'id="xs-controllers-links-module-UserModule-bcd72083a6397e7835b84005321c2239251e3a7f3bd04272b04329a1dd18b3ff45c4953906ced29b5a6d27f01e7a6540b696107e3fe959afe378b6e4e3b3c5a3"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-bcd72083a6397e7835b84005321c2239251e3a7f3bd04272b04329a1dd18b3ff45c4953906ced29b5a6d27f01e7a6540b696107e3fe959afe378b6e4e3b3c5a3"' : 'data-bs-target="#xs-injectables-links-module-UserModule-bcd72083a6397e7835b84005321c2239251e3a7f3bd04272b04329a1dd18b3ff45c4953906ced29b5a6d27f01e7a6540b696107e3fe959afe378b6e4e3b3c5a3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-bcd72083a6397e7835b84005321c2239251e3a7f3bd04272b04329a1dd18b3ff45c4953906ced29b5a6d27f01e7a6540b696107e3fe959afe378b6e4e3b3c5a3"' :
                                        'id="xs-injectables-links-module-UserModule-bcd72083a6397e7835b84005321c2239251e3a7f3bd04272b04329a1dd18b3ff45c4953906ced29b5a6d27f01e7a6540b696107e3fe959afe378b6e4e3b3c5a3"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ServiceController.html" data-type="entity-link" >ServiceController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/TransactionController.html" data-type="entity-link" >TransactionController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthDto.html" data-type="entity-link" >AuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ServiceDTO.html" data-type="entity-link" >ServiceDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/ServiceHire.html" data-type="entity-link" >ServiceHire</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDTO.html" data-type="entity-link" >UserDTO</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrismaService.html" data-type="entity-link" >PrismaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ServiceService.html" data-type="entity-link" >ServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransactionService.html" data-type="entity-link" >TransactionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});