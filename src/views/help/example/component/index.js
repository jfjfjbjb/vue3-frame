const modules = import.meta.glob('./*/*.vue', { eager: true });

export default modules;