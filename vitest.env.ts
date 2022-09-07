// NOTE: This is needed in order to setup the
// custom matchers from testing-library jest-dom.
// We have to do this in a seperate file so that vitest can
// be setup first, which makes "expect" a global which jest-dom
// will extend.
import "@testing-library/jest-dom";
