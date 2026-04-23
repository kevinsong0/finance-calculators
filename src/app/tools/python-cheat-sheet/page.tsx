import type { Metadata } from 'next';
import { Suspense } from 'react';
import PythonCheatSheet from '@/components/PythonCheatSheet';

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I create a Python virtual environment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Create virtual environment: python -m venv venv (or python3 -m venv venv). Activate Linux/Mac: source venv/bin/activate. Activate Windows: venv\\Scripts\\activate. Exit: deactivate. Virtual environment isolates project dependencies. Always use venv for Python projects to avoid conflicts. Delete venv folder to remove."
      }
    },
    {
      "@type": "Question",
      "name": "How do I install Python packages?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Install package: pip install package-name. Install specific version: pip install package==1.2.3. Install from requirements file: pip install -r requirements.txt. Install development version: pip install git+https://github.com/user/repo.git. Save dependencies: pip freeze > requirements.txt. Always activate venv before installing."
      }
    },
    {
      "@type": "Question",
      "name": "How do I run Python tests?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Run pytest: python -m pytest (or pytest). Run unittest: python -m unittest discover. Verbose output: pytest -v. Run specific test: pytest test_file.py::test_function. Coverage: pytest --cov=src. Parallel tests: pytest -n auto (pytest-xdist). Install pytest first: pip install pytest pytest-cov."
      }
    },
    {
      "@type": "Question",
      "name": "How do I format Python code?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Format with Black: python -m black file.py (pip install black first). Format with autopep8: python -m autopep8 --in-place file.py. Check style: python -m flake8 file.py. Lint: python -m pylint file.py. Black is opinionated formatter, autopep8 follows PEP 8. Configure in pyproject.toml or .flake8."
      }
    },
    {
      "@type": "Question",
      "name": "How do I build and publish a Python package?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Install build tools: pip install build twine. Build package: python -m build (creates dist/). Upload to PyPI: twine upload dist/*. Check package: twine check dist/*. Use pyproject.toml for modern packaging. Test PyPI: twine upload --repository testpypi dist/*. Register at pypi.org before publishing."
      }
    }
  ]
};

export const metadata: Metadata = {
  title: 'Python Command Cheat Sheet - Essential Python Commands Reference',
  description: 'Complete Python command reference. Run scripts, pip install, virtual environments, testing, formatting, linting, and packaging. Essential for Python development workflows.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-12">Loading...</div>}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PythonCheatSheet />
    </Suspense>
  );
}