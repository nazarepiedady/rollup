module.exports = defineTest({
	description: 'keep import attributes for dynamic imports with "with" key',
	expectedWarnings: ['UNRESOLVED_IMPORT'],
	options: {
		output: {
			importAttributesKey: 'with'
		},
		external: id => {
			if (id === 'unresolved') return null;
			return true;
		},
		plugins: [
			{
				name: 'test',
				resolveDynamicImport(specifier) {
					if (typeof specifier === 'object') {
						if (specifier.type === 'TemplateLiteral') {
							return "'resolvedString'";
						}
						if (specifier.type === 'BinaryExpression') {
							return { id: 'resolved-id', external: true };
						}
					} else if (specifier === 'external-resolved') {
						return { id: 'resolved-different', external: true };
					}
					return null;
				}
			}
		]
	}
});
