/**
 * type Page
 */
export declare type Page = {
  /**
   * Current page title
   * 
   * https://nullstack.app/context-page
   * 
   */
  title: string,

  /** Current page description
   * 
   * https://nullstack.app/context-page
   */
  description: string,

  /**
   * Current page locale
   *
   * https://nullstack.app/context-page
   */
  locale: string
};

/**
 * exported page constant
 */
export declare const page: Page;
