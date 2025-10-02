

// Conversion de valeur d'un type de donnees vers un autre type.
public class CastingType {
    public static void main(String[] args) {
        // il existe deux type de casting : 
        // - Implicite (Automatique) - Widening : 
        int entier = 100;
        long longVal = entier;
        float floatVal = longVal;
        double doubleVal = floatVal;

        System.out.println("Conversion automatique implicite de donnees :");
        System.out.println("entier : " + entier);
        System.out.println("loong : " + longVal);
        System.out.println("float : " + floatVal);
        System.out.println("double : " + doubleVal);

        // - explicite (Manuelle) - Narrowing :
        System.out.println("Conversion explicite d'un type : ");
        System.out.println("Entier en long - (long) entier : " + ((long) entier)); 
        System.out.println("Entier en double - (double) entier : " + ((double) entier)); 
        System.out.println("Entier en float - (float) entier : " + ((float) entier)); 

        // castion avec la chaine de caractere : 
        char car = 'A';
        int codeASCII = (int) car;
        char carfinal = (char) codeASCII;

        System.out.println("Casting avec un lettre : ");
        System.out.println("Caractere = " + car);
        System.out.println("Conversion en entier (CodeASCII) = " + codeASCII);
        System.out.println("Retablir au caractere(codeASCII -> char) = " + carfinal);

        

    }
    
}
