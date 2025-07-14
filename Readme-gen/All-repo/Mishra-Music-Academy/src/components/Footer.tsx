        import React from 'react';
        import Link from 'next/link';

        function Footer() {
            let y = new Date();
            let year = y.getFullYear();
            return (
                <>
                    <div className="bg-slate-600 p-10 rounded-t-3xl flex flex-wrap justify-center">
                        <ul className="flex space-x-4 py-4">
                            <li className="text-2xl bg-black rounded-3xl p-2 px-4 hover:bg-slate-400  hover:text-yellow-500 duration-500  mb-2">
                            <Link href="/" className="btn btn-dark rounded-pill px-3 flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
                                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
                                </svg>
                                <span>Home</span>
                            </Link>
                            </li>
                            <li className="text-2xl bg-black rounded-3xl p-2 px-4 hover:bg-slate-400  hover:text-yellow-500 duration-500  mb-2">
                            <Link href="https://github.com/ShardenduMishra22?tab=repositories" className="btn btn-dark rounded-pill px-3 flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                </svg>
                                <span>Github</span>
                            </Link>
                            </li>
                            <li className="text-2xl bg-black rounded-3xl p-2 px-4 hover:bg-slate-400  hover:text-yellow-500 duration-500  mb-2">
                            <Link href="https://www.linkedin.com/in/shardendumishra22/" className="btn btn-dark rounded-pill px-3 flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                                </svg>
                                <span>LinkedIn</span>
                            </Link>
                            </li>
                            <li className="text-2xl bg-black rounded-3xl p-2 px-4 hover:bg-slate-400  hover:text-yellow-500 duration-500  mb-2">
                            <Link href="https://leetcode.com/u/ShardenduMishra22/" className="btn btn-dark rounded-pill px-3 flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-code" viewBox="0 0 16 16">
                                <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8z"/>
                                </svg>
                                <span>LeetCode</span>
                            </Link>
                            </li>
                            <li className="text-2xl bg-black rounded-3xl p-2 px-4 hover:bg-slate-400  hover:text-yellow-500 duration-500  mb-2">
                            <Link href="https://www.codechef.com/users/shardendu22" className="btn btn-dark rounded-pill px-3 flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-braces" viewBox="0 0 16 16">
                                <path d="M2.114 8.063V7.9c1.005-.102 1.497-.615 1.497-1.6V4.503c0-1.094.39-1.538 1.354-1.538h.273V2h-.376C3.25 2 2.49 2.759 2.49 4.352v1.524c0 1.094-.376 1.456-1.49 1.456v1.299c1.114 0 1.49.362 1.49 1.456v1.524c0 1.593.759 2.352 2.372 2.352h.376v-.964h-.273c-.964 0-1.354-.444-1.354-1.538V9.663c0-.984-.492-1.497-1.497-1.6zM13.51 4.352V2.759C13.51 2 12.75 2 11.137 2h-.376v.964h.273c.964 0 1.354.444 1.354 1.538v1.797c0 .984.492 1.497 1.497 1.6v.162c-1.005.102-1.497.615-1.497 1.6v1.797c0 1.094-.39 1.538-1.354 1.538h-.273v.964h.376c1.613 0 2.373-.759 2.373-2.352V9.663c0-1.094.375-1.456 1.49-1.456V6.908c-1.114 0-1.49-.362-1.49-1.456z"/>
                                </svg>
                                <span>CodeChef</span>
                            </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-gray-800 py-6 px-8 rounded-b-3xl text-white text-center">
                        <h1 className="text-xl font-bold mb-2">
                            Made with all the ❤️ in the world
                        </h1>
                        <h2 className="text-lg font-medium">
                            By Shardendu Mishra
                        </h2>
                        <p className="text-sm mt-2">
                            ©️ {year} ShardenduMishraCreate. All rights reserved.
                        </p>
                    </div>
                </>
            );
        }

        export default Footer;