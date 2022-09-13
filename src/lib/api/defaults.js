const defaults = {};

export default defaults;

defaults.defaultInvalidTypeProduct = undefined;
defaults.defaultRandExpMax = 10;

defaults.pruneProperties = [];
defaults.ignoreProperties = [];
defaults.ignoreMissingRefs = false;
defaults.failOnInvalidTypes = true;
defaults.failOnInvalidFormat = true;

defaults.alwaysFakeOptionals = false;
defaults.optionalsProbability = null;
defaults.fixedProbabilities = true;
defaults.useExamplesValue = false;
defaults.avoidExampleItemsLength = false;
defaults.useDefaultValue = false;
defaults.requiredOnly = false;

defaults.minItems = 0;
defaults.maxItems = null;
defaults.minLength = 0;
defaults.maxLength = null;

defaults.resolveJsonPath = false;
defaults.reuseProperties = false;
defaults.fillProperties = true;
defaults.replaceEmptyByRandomValue = false;

defaults.random = Math.random;

defaults.renderTitle = true;
defaults.renderDescription = true;
defaults.renderComment = false;

defaults.validationOptions = {};
defaults.pickFirstFromExamples = false;
